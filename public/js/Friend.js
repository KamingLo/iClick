document.addEventListener('DOMContentLoaded', function() {
    // Main UI elements
    const friendToggle = document.getElementById('friendToggle');
    const searchToggle = document.getElementById('searchToggle');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.querySelector('.SearchPlayerBttn');
    const usersList = document.getElementById('usersList');
    const infoPanel = document.getElementById('infoPanel');
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    
    // Info display elements
    const backButtonInfo = document.getElementById('backButtonInfo');
    const userInfoData = document.getElementById('userInfoData');
    
    // Current state variables
    let currentMode = 'friendlist'; // 'friendlist' or 'search'
    let currentChatUserId = null;
    let chatRefreshInterval = null;

    // Initialize UI
    init();

    // INITIALIZATION FUNCTIONS
    function init() {
        // Set up event listeners
        setupEventListeners();
        
        // Start in friend list mode
        showFriendList();
        
        // Hide request confirmation box initially
        const requestBox = document.querySelector('.KotakUtamaDisplayReq');
        if (requestBox) {
            requestBox.style.display = 'none';
        }
        
        // Initialize the info display panel (hidden by default)
        const infoDisplay = document.querySelector('.KotakDisplayInfo');
        if (infoDisplay) {
            infoDisplay.style.display = 'none';
        }
        
        // Initialize chat with welcome message
        showWelcomeMessage();
    }

    function setupEventListeners() {
        // Toggle between Friend List and Find
        friendToggle.addEventListener('click', function() {
            if (currentMode !== 'friendlist') {
                friendToggle.classList.add('active');
                searchToggle.classList.remove('active');
                currentMode = 'friendlist';
                showFriendList();
            }
        });

        searchToggle.addEventListener('click', function() {
            if (currentMode !== 'search') {
                searchToggle.classList.add('active');
                friendToggle.classList.remove('active');
                currentMode = 'search';
                showSearchMode();
            }
        });

        // Search functionality
        searchButton.addEventListener('click', searchUsers);
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                searchUsers();
            }
        });

        // Back button in the info panel
        if (backButtonInfo) {
            backButtonInfo.addEventListener('click', closeInfoPanel);
        }

        // Send message in chat
        if (sendMessageBtn) {
            sendMessageBtn.addEventListener('click', sendMessage);
            messageInput.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }

    // UI DISPLAY FUNCTIONS
    function showFriendList() {
        // Clear the users list first
        usersList.innerHTML = '<div class="loading">Loading friends...</div>';
        searchInput.style.display = 'none';
        searchButton.style.display = 'none';
        
        // Fetch and display friends
        fetch('/api/friends')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch friends');
                }
                return response.json();
            })
            .then(data => {
                usersList.innerHTML = '';
                if (data.friends && data.friends.length > 0) {
                    data.friends.forEach(friend => {
                        appendUserToList(friend, true);
                    });
                } else {
                    usersList.innerHTML = '<div class="no-friends-message">You haven\'t followed anyone yet</div>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                usersList.innerHTML = '<div class="error-message">Failed to load friends. Please try again.</div>';
            });
    }

    function showSearchMode() {
        // Show search input and button
        searchInput.style.display = 'block';
        searchButton.style.display = 'block';
        usersList.innerHTML = '<div class="search-prompt">Enter a username to search</div>';
    }

    function searchUsers() {
        const query = searchInput.value.trim();
        if (!query) {
            return;
        }
        
        usersList.innerHTML = '<div class="loading">Searching users...</div>';
        
        fetch(`/api/users/search?username=${encodeURIComponent(query)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Search failed');
                }
                return response.json();
            })
            .then(data => {
                usersList.innerHTML = '';
                if (data.users && data.users.length > 0) {
                    data.users.forEach(user => {
                        appendUserToList(user, user.isFollowing);
                    });
                } else {
                    usersList.innerHTML = '<div class="no-results-message">User not found</div>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                usersList.innerHTML = '<div class="error-message">Search failed. Please try again.</div>';
            });
    }

    function appendUserToList(user, isFollowing) {
        const userItem = document.createElement('div');
        userItem.className = 'UserItem';
        userItem.dataset.userId = user._id;
        
        const followIcon = isFollowing ? '❤️' : '➕';
        
        userItem.innerHTML = `
            <div class="UserInfo">
                <span class="Username">${user.username || 'Unknown User'}</span>
            </div>
            <div class="UserActions">
                <button class="FollowIcon" data-following="${isFollowing}">${followIcon}</button>
                <button class="InfoIcon">ℹ️</button>
                ${isFollowing ? '<button class="ChatUser">Chat</button>' : ''}
            </div>
        `;
        
        // Add event listeners to buttons
        const followButton = userItem.querySelector('.FollowIcon');
        followButton.addEventListener('click', function() {
            toggleFollow(user._id, this);
        });
        
        const infoButton = userItem.querySelector('.InfoIcon');
        infoButton.addEventListener('click', function() {
            showUserInfo(user._id);
        });
        
        const chatButton = userItem.querySelector('.ChatUser');
        if (chatButton) {
            chatButton.addEventListener('click', function() {
                openChat(user._id, user.username);
            });
        }
        
        usersList.appendChild(userItem);
    }

    function showUserInfo(userId) {
        // Show the info panel and load user data
        const infoDisplay = document.querySelector('.KotakDisplayInfo');
        if (infoDisplay) {
            infoDisplay.style.display = 'block';
            
            // Reset scores to placeholder values
            document.querySelectorAll('.ScoreUser').forEach(el => {
                el.textContent = 'Loading...';
            });
            
            // Clear previous rank information
            document.querySelectorAll('.RankText').forEach(el => {
                el.remove();
            });
            
            // Fetch user scores
            fetch(`/api/users/${userId}/scores`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch user scores');
                    }
                    return response.json();
                })
                .then(data => {
                    // Update user name
                    const userInfoName = document.querySelector('.KotakDisplayInfo .UserInfoName');
                    if (userInfoName) {
                        userInfoName.textContent = data.username || 'User Info';
                    }
                    
                    // Update scores
                    document.getElementById('score-mouse-5s').textContent = data.mouse_5s || '-';
                    document.getElementById('score-mouse-10s').textContent = data.mouse_10s || '-';
                    document.getElementById('score-mouse-15s').textContent = data.mouse_15s || '-';
                    document.getElementById('score-keyboard-5s').textContent = data.keyboard_5s || '-';
                    document.getElementById('score-keyboard-10s').textContent = data.keyboard_10s || '-';
                    document.getElementById('score-keyboard-15s').textContent = data.keyboard_15s || '-';
                    
                    // Add rank information if available
                    const ranks = data.ranks || {};
                    for (const key in ranks) {
                        const [mode, timemode] = key.split('_');
                        const scoreEl = document.getElementById(`score-${mode}-${timemode}s`);
                        if (scoreEl && ranks[key]) {
                            const rankText = document.createElement('div');
                            rankText.className = 'RankText';
                            rankText.textContent = `Rank: #${ranks[key]}`;
                            scoreEl.parentNode.appendChild(rankText);
                        }
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    document.querySelectorAll('.ScoreUser').forEach(el => {
                        el.textContent = '-';
                    });
                });
        }
    }

    function closeInfoPanel() {
        const infoDisplay = document.querySelector('.KotakDisplayInfo');
        if (infoDisplay) {
            infoDisplay.style.display = 'none';
        }
    }

    function showWelcomeMessage() {
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'welcome-message';
        welcomeMessage.innerHTML = '<p>Hello Welcome to chat iclick!</p>';
        
        // Keep the chat input area
        const chatInput = chatMessages.querySelector('.ChatInput');
        chatMessages.innerHTML = '';
        chatMessages.appendChild(welcomeMessage);
        
        if (chatInput) {
            chatMessages.appendChild(chatInput);
        }
    }

    // USER INTERACTION FUNCTIONS
    function toggleFollow(userId, buttonElement) {
        // If already following, do nothing (for simplicity - you could implement unfollow if needed)
        if (buttonElement.dataset.following === 'true') {
            return;
        }
        
        // Send friend request
        fetch('/api/friend-requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Request failed');
            }
            return response.json();
        })
        .then(data => {
            // Show success message
            showRequestSentMessage();
            
            // Update button state
            buttonElement.dataset.following = 'pending';
            buttonElement.textContent = '⏳'; // Pending icon
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to send friend request. Please try again.');
        });
    }

    function showRequestSentMessage() {
        alert('Friend request sent successfully!');
    }

    function openChat(userId, username) {
        // Clear previous chat refresh interval if it exists
        if (chatRefreshInterval) {
            clearInterval(chatRefreshInterval);
        }
        
        // Set current chat user
        currentChatUserId = userId;
        
        // Update UI to show we're chatting with this user
        const userInfoName = document.getElementById('userInfoName');
        if (userInfoName) {
            userInfoName.textContent = username || 'Chat';
        }
        
        // Clear previous chat and show loading
        chatMessages.innerHTML = '<div class="loading-chat">Loading messages...</div>';

        // Make sure the chat input area is visible
        const chatInput = document.createElement('div');
        chatInput.className = 'ChatInput';
        chatInput.innerHTML = `
            <input type="text" id="messageInput" placeholder="Type a message">
            <button id="sendMessageBtn">Send</button>
        `;
        
        // Add refresh button to the chat
        const refreshButton = document.createElement('button');
        refreshButton.className = 'refresh-chat-btn';
        refreshButton.textContent = '🔄 Refresh';
        refreshButton.addEventListener('click', function() {
            loadChatMessages();
        });
        
        // Remove existing refresh button if any
        const existingRefreshBtn = infoPanel.querySelector('.refresh-chat-btn');
        if (existingRefreshBtn) {
            existingRefreshBtn.remove();
        }
        
        // Add new refresh button
        infoPanel.querySelector('.InfoPlayer').appendChild(refreshButton);
        
        // Load chat messages
        loadChatMessages();
        
        // Reattach event listeners for chat input
        const msgInput = chatInput.querySelector('#messageInput');
        const sendBtn = chatInput.querySelector('#sendMessageBtn');
        
        sendBtn.addEventListener('click', sendMessage);
        msgInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Set up refresh interval (every 10 seconds)
        chatRefreshInterval = setInterval(loadChatMessages, 10000);
    }

    function loadChatMessages() {
        if (!currentChatUserId) return;
        
        fetch(`/api/messages/${currentChatUserId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch messages');
                }
                return response.json();
            })
            .then(data => {
                displayChatMessages(data.messages);
            })
            .catch(error => {
                console.error('Error:', error);
                
                // Preserve the chat input on error
                const chatInput = chatMessages.querySelector('.ChatInput');
                chatMessages.innerHTML = '<div class="error-message">Failed to load messages. Please try again.</div>';
                if (chatInput) {
                    chatMessages.appendChild(chatInput);
                } else {
                    // Recreate input if it doesn't exist
                    const newChatInput = document.createElement('div');
                    newChatInput.className = 'ChatInput';
                    newChatInput.innerHTML = `
                        <input type="text" id="messageInput" placeholder="Type a message">
                        <button id="sendMessageBtn">Send</button>
                    `;
                    chatMessages.appendChild(newChatInput);
                    
                    // Reattach event listeners
                    const msgInput = newChatInput.querySelector('#messageInput');
                    const sendBtn = newChatInput.querySelector('#sendMessageBtn');
                    
                    sendBtn.addEventListener('click', sendMessage);
                    msgInput.addEventListener('keyup', function(event) {
                        if (event.key === 'Enter') {
                            sendMessage();
                        }
                    });
                }
            });
    }

    function displayChatMessages(messages) {
        // Save chat input before clearing messages
        const chatInput = chatMessages.querySelector('.ChatInput');
        
        if (!messages || messages.length === 0) {
            chatMessages.innerHTML = '<div class="no-messages">No messages yet. Start chatting!</div>';
            
            // Re-add the chat input
            if (chatInput) {
                chatMessages.appendChild(chatInput);
            } else {
                // Create new chat input if it doesn't exist
                const newChatInput = document.createElement('div');
                newChatInput.className = 'ChatInput';
                newChatInput.innerHTML = `
                    <input type="text" id="messageInput" placeholder="Type a message">
                    <button id="sendMessageBtn">Send</button>
                `;
                chatMessages.appendChild(newChatInput);
                
                // Attach event listeners
                const msgInput = newChatInput.querySelector('#messageInput');
                const sendBtn = newChatInput.querySelector('#sendMessageBtn');
                
                sendBtn.addEventListener('click', sendMessage);
                msgInput.addEventListener('keyup', function(event) {
                    if (event.key === 'Enter') {
                        sendMessage();
                    }
                });
            }
            return;
        }
        
        // Clear previous messages
        chatMessages.innerHTML = '';
        
        // Add messages
        messages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.className = msg.isFromCurrentUser ? 'message-sent' : 'message-received';
            
            const timestamp = new Date(msg.timestamp);
            const formattedTime = `${timestamp.getHours()}:${String(timestamp.getMinutes()).padStart(2, '0')}`;
            
            messageElement.innerHTML = `
                <div class="message-content">${msg.message}</div>
                <div class="message-time">${formattedTime}</div>
            `;
            
            chatMessages.appendChild(messageElement);
        });
        
        // Re-add the chat input
        if (chatInput) {
            chatMessages.appendChild(chatInput);
        } else {
            // Create new chat input if it doesn't exist
            const newChatInput = document.createElement('div');
            newChatInput.className = 'ChatInput';
            newChatInput.innerHTML = `
                <input type="text" id="messageInput" placeholder="Type a message">
                <button id="sendMessageBtn">Send</button>
            `;
            chatMessages.appendChild(newChatInput);
            
            // Attach event listeners
            const msgInput = newChatInput.querySelector('#messageInput');
            const sendBtn = newChatInput.querySelector('#sendMessageBtn');
            
            sendBtn.addEventListener('click', sendMessage);
            msgInput.addEventListener('keyup', function(event) {
                if (event.key === 'Enter') {
                    sendMessage();
                }
            });
        }
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function sendMessage() {
        if (!currentChatUserId) return;
        
        const messageInputElement = document.getElementById('messageInput');
        if (!messageInputElement) return;
        
        const message = messageInputElement.value.trim();
        if (!message) return;
        
        // Clear input
        messageInputElement.value = '';
        
        // Send message to server
        fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                receiverId: currentChatUserId,
                message: message
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
            return response.json();
        })
        .then(data => {
            // Immediately update UI with sent message
            const chatInput = chatMessages.querySelector('.ChatInput');
            
            const messageElement = document.createElement('div');
            messageElement.className = 'message-sent';
            
            const timestamp = new Date();
            const formattedTime = `${timestamp.getHours()}:${String(timestamp.getMinutes()).padStart(2, '0')}`;
            
            messageElement.innerHTML = `
                <div class="message-content">${message}</div>
                <div class="message-time">${formattedTime}</div>
            `;
            
            // Insert before the chat input
            if (chatInput) {
                chatMessages.insertBefore(messageElement, chatInput);
            } else {
                chatMessages.appendChild(messageElement);
            }
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to send message. Please try again.');
        });
    }

    // FRIEND REQUEST HANDLING
    function loadFriendRequests() {
        fetch('/api/friend-requests')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch friend requests');
                }
                return response.json();
            })
            .then(data => {
                if (data.requests && data.requests.length > 0) {
                    showFriendRequests(data.requests);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function showFriendRequests(requests) {
        if (!requests || requests.length === 0) return;
        
        // Get the first request
        const request = requests[0];
        
        // Show the request confirmation box
        const requestBox = document.querySelector('.KotakUtamaDisplayReq');
        if (requestBox) {
            requestBox.style.display = 'block';
            
            // Update the text
            const infoText = requestBox.querySelector('.InfoConfirmReq');
            if (infoText) {
                infoText.textContent = `${request.from.username} wants to add you`;
            }
            
            // Clear previous event listeners
            const acceptButton = requestBox.querySelector('.tmblAcceptReq');
            const declineButton = requestBox.querySelector('.tmblUnAcceptReq');
            
            if (acceptButton) {
                const newAcceptBtn = acceptButton.cloneNode(true);
                acceptButton.parentNode.replaceChild(newAcceptBtn, acceptButton);
                newAcceptBtn.addEventListener('click', function() {
                    acceptFriendRequest(request._id);
                });
            }
            
            if (declineButton) {
                const newDeclineBtn = declineButton.cloneNode(true);
                declineButton.parentNode.replaceChild(newDeclineBtn, declineButton);
                newDeclineBtn.addEventListener('click', function() {
                    declineFriendRequest(request._id);
                });
            }
        }
    }

    function acceptFriendRequest(requestId) {
        fetch(`/api/friend-requests/${requestId}/accept`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to accept request');
            }
            return response.json();
        })
        .then(data => {
            // Hide the request box
            const requestBox = document.querySelector('.KotakUtamaDisplayReq');
            if (requestBox) {
                requestBox.style.display = 'none';
            }
            
            // Refresh friend list
            if (currentMode === 'friendlist') {
                showFriendList();
            }
            
            // Show success message
            alert('Friend request accepted!');
            
            // Load next request if any
            loadFriendRequests();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to accept friend request. Please try again.');
        });
    }

    function declineFriendRequest(requestId) {
        fetch(`/api/friend-requests/${requestId}/decline`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to decline request');
            }
            return response.json();
        })
        .then(data => {
            // Hide the request box
            const requestBox = document.querySelector('.KotakUtamaDisplayReq');
            if (requestBox) {
                requestBox.style.display = 'none';
            }
            
            // Load next request if any
            loadFriendRequests();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to decline friend request. Please try again.');
        });
    }

    // Load friend requests on page load
    loadFriendRequests();

    // Check for new friend requests periodically (every 30 seconds)
    setInterval(loadFriendRequests, 30000);
});