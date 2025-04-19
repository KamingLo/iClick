document.addEventListener('DOMContentLoaded', function() {
    const friendToggle = document.getElementById('friendToggle');
    const searchToggle = document.getElementById('searchToggle');
    const slider = document.querySelector('.ToggleSlide');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.SearchPlayerBttn');
    const usersList = document.getElementById('usersList');
    const infoPanel = document.getElementById('infoPanel');
    const backButtonInfo = document.getElementById('backButtonInfo');
    const userInfoData = document.getElementById('userInfoData');
    const chatMessages = document.getElementById('chatMessages');
    const chatButton = document.getElementById('chatButton');
    const followButton = document.getElementById('followButton');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const userInfoName = document.getElementById('userInfoName');
    
    let currentMode = 'friend';
    let selectedUserId = null;
    let isFollowing = false;
    let isPanelOpen = false;
    let isChatOpen = false;
    
    friendToggle.addEventListener('click', () => {
        slider.style.transform = 'translateX(0%)';
        friendToggle.classList.add('active');
        searchToggle.classList.remove('active');
        currentMode = 'friend';
        loadUsers();
        
        if (isPanelOpen) {
            closeInfoPanel();
        }
    });
    
    searchToggle.addEventListener('click', () => {
        slider.style.transform = 'translateX(100%)';
        searchToggle.classList.add('active');
        friendToggle.classList.remove('active');
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
        openChatPanel();
    });
    
    sendMessageBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    followButton.addEventListener('click', toggleFollow);
    
    loadUsers();
    
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
                    
                    userElement.innerHTML = `
                        <div class="UserItem-content">
                            <div class="UserInfo">
                                <span class="Username">${user.username || 'Unknown User'}</span>
                            </div>
                            <div class="UserActions">
                                <button class="FollowIcon">${user.isFollowing ? '❤️' : '➕'}</button>
                                <button class="InfoIcon">ℹ️</button>
                            </div>
                        </div>
                    `;
                    
                    usersList.appendChild(userElement);
    
                    userElement.querySelector('.InfoIcon').addEventListener('click', () => {
                        loadUserInfo(user._id, user.username, user.isFollowing);
                    });
                    
                    userElement.querySelector('.FollowIcon').addEventListener('click', () => {
                        toggleFollowFromList(user._id, userElement.querySelector('.FollowIcon'));
                    });
                });
            })
            .catch(error => {
                console.error('Error loading users:', error);
                usersList.innerHTML = '<div class="ErrorMessage">Failed to load users.</div>';
            });
    }
    
    function loadUserInfo(userId, username, following) {
        selectedUserId = userId;
        isFollowing = following;
        
        userInfoName.textContent = username;
        if (isFollowing) {
            followButton.textContent = 'Unfollow';
        } else {
            followButton.textContent = 'Follow';
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
    }
    
    function openInfoPanel() {
        infoPanel.classList.remove('hidden');
        infoPanel.classList.add('slide-in');
        userInfoData.classList.remove('hidden');
        chatMessages.classList.add('hidden');
        isPanelOpen = true;
        isChatOpen = false;
    }
    
    function closeInfoPanel() {
        infoPanel.classList.remove('slide-in');
        infoPanel.classList.add('slide-out');
        
        setTimeout(() => {
            infoPanel.classList.add('hidden');
            infoPanel.classList.remove('slide-out');
            isPanelOpen = false;
        }, 300);
    }
    
    function openChatPanel() {
        userInfoData.classList.add('hidden');
        chatMessages.classList.remove('hidden');
        isChatOpen = true;
        
        loadChatMessages();
    }
    
    function closeChatPanel() {
        chatMessages.classList.add('hidden');
        userInfoData.classList.remove('hidden');
        isChatOpen = false;
    }
    
    function loadChatMessages() {
        if (!selectedUserId) return;
        
        fetch(`/api/chats/${selectedUserId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    chatMessages.innerHTML = '';
                    
                    if (data.messages.length === 0) {
                        chatMessages.innerHTML = '<div class="EmptyChat">Say hello! 😊</div>';
                        
                        chatMessages.innerHTML += `
                            <div class="ChatInput">
                                <input type="text" id="messageInput" placeholder="Type a message...">
                                <button id="sendMessageBtn">Send</button>
                            </div>
                        `;
                        
                        document.getElementById('messageInput').addEventListener('keyup', (e) => {
                            if (e.key === 'Enter') sendMessage();
                        });
                        document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
                        
                        return;
                    }
                    
                    data.messages.forEach(msg => {
                        const messageElement = document.createElement('div');
                        messageElement.className = `ChatMessage ${msg.sender === selectedUserId ? 'received' : 'sent'}`;
                        messageElement.textContent = msg.message;
                        chatMessages.appendChild(messageElement);
                    });
                    
                    const chatInputDiv = document.createElement('div');
                    chatInputDiv.className = 'ChatInput';
                    chatInputDiv.innerHTML = `
                        <input type="text" id="messageInput" placeholder="Type a message...">
                        <button id="sendMessageBtn">Send</button>
                    `;
                    chatMessages.appendChild(chatInputDiv);
                    
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
    
    function sendMessage() {
        const msgInput = document.getElementById('messageInput');
        const message = msgInput.value.trim();
        if (!message || !selectedUserId) return;
        
        fetch(`/api/chats/${selectedUserId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    msgInput.value = '';
                    
                    const messageElement = document.createElement('div');
                    messageElement.className = 'ChatMessage sent';
                    messageElement.textContent = message;
                    
                    const chatInputDiv = document.querySelector('.ChatInput');
                    chatMessages.insertBefore(messageElement, chatInputDiv);
                    
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    }
    
    function toggleFollow() {
        if (!selectedUserId) return;
        
        fetch(`/api/users/${selectedUserId}/follow`, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    isFollowing = data.action === 'followed';
                    if (isFollowing) {
                        followButton.textContent = 'Unfollow';
                    } else {
                        followButton.textContent = 'Follow';
                    }
                    
                    loadUsers(searchInput.value);
                }
            })
            .catch(error => {
                console.error('Error toggling follow status:', error);
            });
    }
    
    function toggleFollowFromList(userId, button) {
        fetch(`/api/users/${userId}/follow`, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    if (data.action === 'followed') {
                        button.textContent = '➕';
                      } else {
                        button.textContent = '❤️';
                      }
                    
                    if (userId === selectedUserId) {
                        isFollowing = data.action === 'followed';
                        if (isFollowing) {
                            followButton.textContent = 'Unfollow';
                        } else {
                            followButton.textContent = 'Follow';
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
});