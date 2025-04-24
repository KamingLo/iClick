document.addEventListener('DOMContentLoaded', function() {
    const friendToggle = document.getElementById('friendToggle');
    const searchToggle = document.getElementById('searchToggle');
    const slider = document.querySelector('.ToggleSlide');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.SearchPlayerBttn');
    const usersList = document.getElementById('usersList');
    const infoPanel = document.getElementById('infoPanel');
    const infoUsers = document.getElementById('infoUsers');
    const backButtonInfo = document.getElementById('backButtonInfo');
    const userInfoData = document.getElementById('userInfoData');
    const chatMessages = document.getElementById('chatMessages');
    const chatButton = document.getElementById('chatButton');
    const followButton = document.getElementById('followButton');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const userInfoName = document.getElementById('userInfoName');
    const followRequestContainer = document.querySelector('.KotakUtamaDisplayReq');
    const requestInfo = document.querySelector('.InfoConfirmReq');
    const acceptBtn = document.querySelector('.tmblAcceptReq');
    const declineBtn = document.querySelector('.tmblUnAcceptReq');
    const editAliasPopup = document.getElementById("editAliasPopup");
    const deleteBtn = document.getElementById('deleteChatButton');
    const deleteChatBtn = document.getElementById('deleteChatButton');
    const deleteConfirmPopup = document.querySelector('.BackGroundBlurDisplayDeleteChat');
    const acceptDeleteBtn = document.querySelector('.tmblAcceptC');
    const cancelDeleteBtn = document.querySelector('.tmblUnAcceptC');

    
    
    let currentMode = 'friend';
    let selectedUserId = null;
    let isFollowing = false;
    let isPanelOpen = false;
    let isChatOpen = false;
    let pendingRequests = [];
    let currentRequestIndex = 0;
    let userAliases = JSON.parse(localStorage.getItem('userAliases')) || {};
    
    infoPanel.classList.add('hidden');




// Tambah ini setelah semua fungsi lainnya
const socket = io();
const userId = document.querySelector('meta[name="user-id"]').content;
socket.emit('authenticate', userId);

// Terima pesan dari orang lain secara realtime
socket.on('private message', (data) => {
    if (selectedUserId === data.senderId) {
        const messageElement = document.createElement('div');
        messageElement.className = 'ChatMessage received';
        messageElement.textContent = data.message;
        const chatInput = document.querySelector('.ChatInput');
        chatMessages.insertBefore(messageElement, chatInput);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});


    
    // Initially hide the follow request container
    if (followRequestContainer) {
        followRequestContainer.style.display = 'none';
    }
    


  
    
    // Edit alias popup handlers
    const originalUsernameEl = document.getElementById('originalUsername');
    const aliasInput = document.getElementById('aliasInput');
    const saveAliasBtn = document.getElementById('saveAliasBtn');
    const cancelAliasBtn = document.getElementById('cancelAliasBtn');
    const removeAliasBtn = document.getElementById('removeAliasBtn');
    
    let currentEditingUserId = null;
    
    function openEditAliasPopup(userId, username) {
        currentEditingUserId = userId;
        originalUsernameEl.textContent = `Original name: ${username}`;
        aliasInput.value = userAliases[userId] || '';
        editAliasPopup.classList.remove('hidden');
    }
    
    function closeEditAliasPopup() {
        editAliasPopup.classList.add('hidden');
        currentEditingUserId = null;
    }
    
    saveAliasBtn.addEventListener('click', () => {
        const alias = aliasInput.value.trim();
        if (alias && currentEditingUserId) {
            userAliases[currentEditingUserId] = alias;
            localStorage.setItem('userAliases', JSON.stringify(userAliases));
            
            // Update UI to show the alias
            const usernameSpan = document.querySelector(`.UserItem[data-user-id="${currentEditingUserId}"] .Username`);
            if (usernameSpan) {
                const originalName = usernameSpan.getAttribute('data-original-name');
                usernameSpan.textContent = `${alias} (${originalName})`;
            }
            
            // Update info panel if this user is selected
            if (currentEditingUserId === selectedUserId) {
                const originalName = userInfoName.getAttribute('data-original-name');
                userInfoName.textContent = `${alias} (${originalName})`;
            }
        }
        closeEditAliasPopup();
    });
    
    cancelAliasBtn.addEventListener('click', closeEditAliasPopup);
    
    removeAliasBtn.addEventListener('click', () => {
        if (currentEditingUserId) {
            delete userAliases[currentEditingUserId];
            localStorage.setItem('userAliases', JSON.stringify(userAliases));
            
            // Update UI to remove the alias
            const usernameSpan = document.querySelector(`.UserItem[data-user-id="${currentEditingUserId}"] .Username`);
            if (usernameSpan) {
                const originalName = usernameSpan.getAttribute('data-original-name');
                usernameSpan.textContent = originalName;
            }
            
            // Update info panel if this user is selected
            if (currentEditingUserId === selectedUserId) {
                const originalName = userInfoName.getAttribute('data-original-name');
                userInfoName.textContent = originalName;
            }
        }
        closeEditAliasPopup();
    });
    
    friendToggle.addEventListener('click', () => {
        if (isPanelOpen) return; // ⛔ blok klik saat info panel terbuka
    
        slider.style.transform = 'translateX(0%)';
        friendToggle.classList.add('active');
        searchToggle.classList.remove('active');
        currentMode = 'friend';
        loadUsers();
        updateChatButton();
    });
    
    
    
    
    searchToggle.addEventListener('click', () => {
        slider.style.transform = 'translateX(100%)';
        searchToggle.classList.add('active');
        friendToggle.classList.remove('active');
        chatButton.classList.add('hidden');
        currentMode = 'search';
        loadUsers();
        
        if (isPanelOpen) {
            closeInfoPanel();
        }
    });
    
    searchButton.addEventListener('click', () => {
        loadUsers(searchInput.value);
    });
    
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            loadUsers(searchInput.value);
        }
    });
    
    backButtonInfo.addEventListener('click', () => {
        if (isChatOpen) {
            closeChatPanel();
        } else {
            closeInfoPanel();
        }
    });

    chatButton.addEventListener('click', () => {
        if (isFollowing) {
            openChatPanel();
        }
    });
    
    sendMessageBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    followButton.addEventListener('click', toggleFollow);
    
    // Load initial users and follow requests
    loadUsers();
    loadFollowRequests();

    function updateChatButton() {
        if (isFollowing) {
            chatButton.classList.remove('hidden');
            chatButton.classList.remove('disabled');
            chatButton.removeAttribute('disabled');
        } else {
            chatButton.classList.add('hidden');
            chatButton.classList.add('disabled');
            chatButton.setAttribute('disabled', 'disabled');
        }
    }    
    
    function loadUsers(search = '') {
        let url;
    
        if (currentMode === 'friend') {
            url = '/api/friends';
        } else {
            url = search ? `/api/users/search?username=${encodeURIComponent(search)}` : '/api/users/random';
        }
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                usersList.innerHTML = '';
    
                const users = currentMode === 'friend' ? data.friends : data.users;
    
                if (!users || users.length === 0) {
                    usersList.innerHTML = `
                        <div class="EmptyState">
                            ${currentMode === 'friend' ? 'You haven\'t followed anyone yet.' : 'No users found.'}
                        </div>
                    `;
                    return;
                }
    
                users.forEach(user => {
                    const userElement = document.createElement('div');
                    userElement.className = 'UserItem';
                    userElement.dataset.userId = user._id;
    
                    // Gunakan fallback jika properti tidak tersedia
                    const isPending = !!user.isPendingRequest;
                    const isFollowing = !!user.isFollowing;
                    const showChatIcon = isFollowing;
                    const showEditIcon = currentMode === 'friend' && isFollowing;
    
                    const displayName = userAliases[user._id]
                        ? `${userAliases[user._id]} (${user.username || 'Unknown User'})`
                        : (user.username || 'Unknown User');
    
                    userElement.innerHTML = `
                        <div class="UserItem-content" ${isPending ? 'style="border-color: yellow;"' : ''}>
                            <div class="UserInfo">
                                <span class="Username" data-original-name="${user.username || 'Unknown User'}">${displayName}</span>
                                ${showEditIcon ? '<span class="EditIcon" title="Edit Alias">✏️</span>' : ''}
                            </div>
                            <div class="ForChatIcon">
                                ${showChatIcon ? '<button class="ChatIcon">💬</button>' : ''}
                            </div>
                            <div class="UserActions">
                                <button class="FollowIcon">${isFollowing ? '❤️' : (isPending ? '🕒' : '➕')}</button>
                                <button class="InfoIcon">ℹ️</button>
                            </div>
                        </div>
                    `;
    
                    usersList.appendChild(userElement);
    
                    // Info button
                    userElement.querySelector('.InfoIcon').addEventListener('click', () => {
                        loadUserInfo(user._id, user.username, isFollowing);
                    });
    
                    // Follow button
                    userElement.querySelector('.FollowIcon').addEventListener('click', () => {
                        toggleFollowFromList(user._id, userElement.querySelector('.FollowIcon'));
                    });
    
                    // Chat icon
                    const chatIcon = userElement.querySelector('.ChatIcon');
                    if (chatIcon) {
                        chatIcon.addEventListener('click', () => {
                            loadUserInfo(user._id, user.username, isFollowing);
                            setTimeout(() => {
                                openChatPanel();
                            }, 300);
                        });
                    }
    
                    // Edit icon
                    const editIcon = userElement.querySelector('.EditIcon');
                    if (editIcon) {
                        editIcon.addEventListener('click', (e) => {
                            e.stopPropagation();
                            openEditAliasPopup(user._id, user.username);
                        });
                    }
                });
            })
            .catch(error => {
                console.error('Error loading users:', error.message || error);
                usersList.innerHTML = '<div class="ErrorMessage">Failed to load users.</div>';
            });
    }
    
    
    function loadUserInfo(userId, username, following) {
        selectedUserId = userId;
        isFollowing = following;
        const displayName = userAliases[userId] ? 
            `${userAliases[userId]} (${username})` : username;
        
        userInfoName.textContent = displayName;
        userInfoName.setAttribute('data-original-name', username);

        updateChatButton();
        
        if (isFollowing) {
            followButton.textContent = 'Unfollow';
            chatButton.classList.remove('disabled');
            chatButton.removeAttribute('disabled');
        } else {
            followButton.textContent = 'Follow';
            chatButton.classList.add('disabled');
            chatButton.setAttribute('disabled', 'disabled');
        }
          
            fetch(`/api/users/${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const scores = data.user.scores;
                    
                    document.getElementById('score-mouse-5s').textContent = scores.mouse['5'];
                    document.getElementById('score-mouse-10s').textContent = scores.mouse['10'];
                    document.getElementById('score-mouse-15s').textContent = scores.mouse['15'];
                    
                    document.getElementById('score-keyboard-5s').textContent = scores.keyboard['5'];
                    document.getElementById('score-keyboard-10s').textContent = scores.keyboard['10'];
                    document.getElementById('score-keyboard-15s').textContent = scores.keyboard['15'];
                    
                    openInfoPanel();
                }
            })
            .catch(error => {
                console.error('Error loading user info:', error);
            });

            fetch(`/api/users/${userId}/super-rank`)
            .then(res => res.json())
            .then(rankData => {
                const rankDisplay = document.getElementById('rankUserInfo');
                if (rankData && rankData.rank) {
                    rankDisplay.textContent = `Overall Rank #${rankData.rank} (Total: ${rankData.totalScore})`;
                } else {
                    rankDisplay.textContent = 'Overall Rank: No Data';
                }
            })
            .catch(err => {
                console.error('Failed to fetch super rank:', err);
                const rankDisplay = document.getElementById('rankUserInfo');
                if (rankDisplay) rankDisplay.textContent = 'Overall Rank: No Data';
            });

            fetch(`/api/users/${userId}/ultimate-rank`)
            .then(res => res.json())
            .then(rankData => {
                const rankDisplay = document.getElementById('rankUserInfo');
                if (rankData && rankData.rank) {
                    rankDisplay.textContent = `Overall Rank #${rankData.rank} (Total: ${rankData.totalScore})`;
                } else {
                    rankDisplay.textContent = 'Overall Rank: No Data';
                }
            })
            .catch(err => {
                console.error('Failed to fetch overall rank:', err);
                const rankDisplay = document.getElementById('rankUserInfo');
                if (rankDisplay) rankDisplay.textContent = 'Overall Rank: No Data';
            });
    }
    
    function openInfoPanel() {
        infoPanel.classList.remove('hidden');
        infoPanel.classList.add('grow-in');
        userInfoData.classList.remove('hidden');
        chatMessages.classList.add('hidden');
        isPanelOpen = true;
        isChatOpen = false;
    

        if (infoUsers) {
            infoUsers.classList.remove('slide-right');
            infoUsers.classList.add('slide-left');
        }
    }
    
    
    function closeInfoPanel() {
        const slideRightElement = document.getElementById("slide-right");
        if (slideRightElement) {
            slideRightElement.classList.remove("slide-right");
        }
    
        infoPanel.classList.remove('slide-in');
        infoPanel.classList.add('grow-out');
    
        if (infoUsers) {
            infoUsers.classList.remove('slide-left');
            infoUsers.classList.add('slide-right');
        }
    
        setTimeout(() => {
            infoPanel.classList.add('hidden');
            infoPanel.classList.remove('grow-out');
    
            if (infoUsers) {
                infoUsers.style.transform = 'translateX(0)';
                infoUsers.classList.remove('slide-right');
                // ⛔ Jangan tambahkan classList.add('hidden') di sini
            }
    
            isPanelOpen = false;
        }, 300);
    }
    
    
    
    
    
    function openChatPanel() {
        if (!isFollowing || !selectedUserId) {
            alert("You need to follow this user to chat with them!");
            return;
        }
      
        userInfoData.classList.add('hidden');
        chatMessages.classList.remove('hidden');
        isChatOpen = true;
      
        // Tampilkan tombol delete jika panel chat terbuka
        if (deleteBtn) {
            deleteBtn.style.display = 'inline-block';
        }
      
        loadChatMessages();
    }
    
    function closeChatPanel() {
        chatMessages.classList.add('hidden');
        userInfoData.classList.remove('hidden');
        isChatOpen = false;
      
        // Sembunyikan tombol delete saat chat ditutup
        if (deleteBtn) {
            deleteBtn.style.display = 'none';
        }
      }

    function loadFollowRequests() {
        fetch('/api/follow-requests')
            .then(response => response.json())
            .then(data => {
                if (data.success && data.requests && data.requests.length > 0) {
                    pendingRequests = data.requests;
                    currentRequestIndex = 0;
                    displayCurrentRequest();
                    // Show the follow request container
                    if (followRequestContainer) {
                        followRequestContainer.style.display = 'block';
                    }
                } else {
                    // Hide the container if no requests
                    if (followRequestContainer) {
                        followRequestContainer.style.display = 'none';
                    }
                }
            })
            .catch(error => {
                console.error('Error loading follow requests:', error);
            });
    }

    function displayCurrentRequest() {
        if (pendingRequests.length === 0) {
            if (followRequestContainer) {
                followRequestContainer.style.display = 'none';
            }
            return;
        }
        
        const request = pendingRequests[currentRequestIndex];
        if (requestInfo && request) {
            requestInfo.textContent = `${request.username} wants to follow you`;
        }
    }

    // Make sure accept button has an event listener
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            if (pendingRequests.length === 0) return;
            
            const userId = pendingRequests[currentRequestIndex]._id;
            
            fetch(`/api/follow-requests/${userId}/accept`, {
                method: 'POST'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        pendingRequests.splice(currentRequestIndex, 1);
                        if (currentRequestIndex >= pendingRequests.length) {
                            currentRequestIndex = 0;
                        }
                        
                        if (pendingRequests.length === 0) {
                            if (followRequestContainer) {
                                followRequestContainer.style.display = 'none';
                            }
                        } else {
                            displayCurrentRequest();
                        }
                        
                        loadUsers(); // Refresh user list after accepting request
                    }
                })
                .catch(error => {
                    console.error('Error accepting follow request:', error);
                });
        });
    }
    
    // Make sure decline button has an event listener
    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            if (pendingRequests.length === 0) return;
            
            const userId = pendingRequests[currentRequestIndex]._id;
            
            fetch(`/api/follow-requests/${userId}/decline`, {
                method: 'POST'
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        pendingRequests.splice(currentRequestIndex, 1);
                        if (currentRequestIndex >= pendingRequests.length) {
                            currentRequestIndex = 0;
                        }
                        
                        if (pendingRequests.length === 0) {
                            if (followRequestContainer) {
                                followRequestContainer.style.display = 'none';
                            }
                        } else {
                            displayCurrentRequest();
                        }
                    }
                })
                .catch(error => {
                    console.error('Error declining follow request:', error);
                });
        });
    }

    function toggleFollowFromList(userId, button) {
        fetch(`/api/users/${userId}/follow`, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const actions = {
                        followed: {
                            icon: '❤️',
                            borderColor: ''
                        },
                        requested: {
                            icon: '🕒',
                            borderColor: 'yellow'
                        },
                        canceled: {
                            icon: '➕',
                            borderColor: ''
                        },
                        unfollowed: {
                            icon: '➕',
                            borderColor: ''
                        }
                    };
    
                    const action = actions[data.action];
                    if (action) {
                        button.textContent = action.icon;
                        const contentBox = button.closest('.UserItem-content');
                        if (contentBox) {
                            contentBox.style.borderColor = action.borderColor;
                        }
                    }
    
                    if (userId === selectedUserId) {
                        isFollowing = data.action === 'followed';
                        if (isFollowing) {
                            followButton.textContent = 'Unfollow';
                            updateChatButton();
                        } else if (data.action === 'requested') {
                            followButton.textContent = 'Cancel Request';
                        } else {
                            followButton.textContent = 'Follow';
                            updateChatButton();
                        }
                    }
                    
                    const userItem = button.closest('.UserItem');
                    if (userItem) {
                        const userActions = userItem.querySelector('.UserActions');
                        const forChatIcon = userItem.querySelector('.ForChatIcon');
                        const hasChatIcon = !!forChatIcon.querySelector('.ChatIcon');
                        
                        if (data.action === 'followed' && !hasChatIcon) {
                            const chatButton = document.createElement('button');
                            chatButton.className = 'ChatIcon';
                            chatButton.textContent = '💬';
                            forChatIcon.appendChild(chatButton);
                            
                            chatButton.addEventListener('click', () => {
                                const username = userItem.querySelector('.Username').getAttribute('data-original-name');
                                loadUserInfo(userId, username, true);
                                setTimeout(() => {
                                    openChatPanel();
                                }, 300);
                            });
                        } else if ((data.action === 'unfollowed' || data.action === 'canceled') && hasChatIcon) {
                            forChatIcon.querySelector('.ChatIcon').remove();
                        }
                    }
    
                    if (currentMode === 'friend' && data.action === 'unfollowed') {
                        loadUsers();
                    }
                }
            })
            .catch(error => {
                console.error('Error toggling follow status:', error);
            });
    }
    
    function loadChatMessages() {
        if (!selectedUserId) return;
        
        fetch(`/api/chats/${selectedUserId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    chatMessages.innerHTML = '';
                    
                    
                    if (data.messages.length === 0) {
                        const emptyChat = document.createElement('div');
                        emptyChat.className = 'EmptyChat';
                        emptyChat.textContent = 'Say hello! 😊';
                        chatMessages.appendChild(emptyChat);
                    } else {
                        data.messages.forEach(msg => {
                            const messageElement = document.createElement('div');
                            messageElement.className = `ChatMessage ${msg.sender === selectedUserId ? 'received' : 'sent'}`;
                            messageElement.textContent = msg.message;
                            chatMessages.appendChild(messageElement);
                        });
                    }
                    
                    // Tambahkan input chat di bagian bawah
                    const chatInputDiv = document.createElement('div');
                    chatInputDiv.className = 'ChatInput';
                    chatInputDiv.innerHTML = `
                        <input type="text" id="messageInput" placeholder="Type a message...">
                        <button id="sendMessageBtn">Send</button>
                    `;
                    chatMessages.appendChild(chatInputDiv);
                    
                    // Tambahkan event listener
                    document.getElementById('messageInput').addEventListener('keyup', (e) => {
                        if (e.key === 'Enter') sendMessage();
                    });
                    document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
                    
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            })
            .catch(error => {
                console.error('Error loading messages:', error);
                chatMessages.innerHTML = '<div class="ErrorMessage">Failed to load messages.</div>';
            });
    }
    
    if (deleteChatBtn) {
        deleteChatBtn.addEventListener('click', () => {
          if (!selectedUserId) return;
          deleteConfirmPopup.style.display = 'flex';
        });
      }
    
      if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', () => {
          deleteConfirmPopup.style.display = 'none';
        });
      }
    
      if (acceptDeleteBtn) {
        acceptDeleteBtn.addEventListener('click', () => {
          if (!selectedUserId) return;
    
          fetch(`/api/chats/${selectedUserId}`, {
            method: 'DELETE'
          })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              loadChatMessages();
              deleteConfirmPopup.style.display = 'none';
            }
          })
          .catch(error => {
            console.error('Error deleting chat:', error);
          });
        });
      }
    
    function sendMessage() {
        const msgInput = document.getElementById('messageInput');
        const message = msgInput.value.trim();
        if (!message || !selectedUserId) return;
    
        fetch(`/api/chats/${selectedUserId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                msgInput.value = '';
    
                // Tampilkan pesan di layar
                const messageElement = document.createElement('div');
                messageElement.className = 'ChatMessage sent';
                messageElement.textContent = message;
    
                const chatInputDiv = document.querySelector('.ChatInput');
                chatMessages.insertBefore(messageElement, chatInputDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
    
                // Kirim pesan realtime ke server
                socket.emit('private message', {
                    senderId: userId,
                    receiverId: selectedUserId,
                    message: message
                });
            }
        })
        .catch(error => console.error('Error sending message:', error));
    }
    
    
        function toggleFollow() {
            if (!selectedUserId) return;
        
            const userCard = document.querySelector(`.UserItem[data-user-id="${selectedUserId}"]`);
            const contentBox = userCard?.querySelector('.UserItem-content');
            const iconButton = userCard?.querySelector('.FollowIcon');
        
            followButton.disabled = true;
        
            fetch(`/api/users/${selectedUserId}/follow`, {
                method: 'POST',
            })
            .then(response => response.json())
            .then(data => {
                if (!data.success) return;
        
                const action = data.action;
        
                followButton.textContent = 'Follow';
                if (iconButton) iconButton.textContent = '➕';
                if (contentBox) contentBox.style.borderColor = '';
        
                switch (action) {
                    case 'followed':
                        isFollowing = true;
                        followButton.textContent = 'Unfollow';
                        if (iconButton) iconButton.textContent = '❤️';
                        
                        if (userCard) {
                            const forChatIcon = userCard.querySelector('.ForChatIcon');
                            if (forChatIcon && !forChatIcon.querySelector('.ChatIcon')) {
                                const chatButton = document.createElement('button');
                                chatButton.className = 'ChatIcon';
                                chatButton.textContent = '💬';
                                forChatIcon.appendChild(chatButton);
                                
                                chatButton.addEventListener('click', () => {
                                    loadUserInfo(selectedUserId, userInfoName.getAttribute('data-original-name'), true);
                                    setTimeout(() => {
                                        openChatPanel();
                                    }, 300);
                                });
                            }
                        }
                        break;
        
                    case 'requested':
                        isFollowing = false;
                        followButton.textContent = 'Cancel Request';
                        if (iconButton) iconButton.textContent = '🕒';
                        if (contentBox) contentBox.style.borderColor = 'yellow';
                        break;
        
                    case 'canceled':
                    case 'unfollowed':
                        isFollowing = false;
                        followButton.textContent = 'Follow';
                        if (iconButton) iconButton.textContent = '➕';
                        if (contentBox) contentBox.style.borderColor = '';
                        
                        if (userCard) {
                            const forChatIcon = userCard.querySelector('.ForChatIcon');
                            const chatIcon = forChatIcon?.querySelector('.ChatIcon');
                            if (chatIcon) {
                                chatIcon.remove();
                            }
                        }
                        break;
                }
        
                updateChatButton();
        
                if (!isFollowing && isChatOpen) {
                    closeChatPanel();
                }
        
                if (currentMode === 'friend') {
                    loadUsers();
                }
            })
            .catch(error => {
                console.error('Error toggling follow status:', error);
            })
            .finally(() => {
                followButton.disabled = false;
            });
        }
        
        // In Friend.js (client-side file)
// Add this after all your existing event listeners




        // Set up a periodic check for new follow requests (every 30 seconds)
        setInterval(loadFollowRequests, 30000);
});