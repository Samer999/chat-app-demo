window.onload = () => {
    const socket = io();

    let receiverId = $('#receiverId').val();
    let senderId = $('#senderId').val();
    // let privateId;
    socket.on('connect', () => {
        console.log('user connected from browser');

        let params = {
            receiverId: receiverId,
            senderId: senderId
        }
        // console.log(params);
        socket.emit('joinPrivate', params, () => {
            console.log('User has joined private channel');
        });
    });

    // socket.on('privateId', (privateChatId) => {
    //     console.log(privateChatId);
    //     if (privateChatId) {
    //         privateId = privateChatId;
    //     }
    // });


    // $('#submit').on('click', (event) => {
    //     console.log('in');
    //     $('#message-form').submit();
    // });

    $('#send-message').on('click', (event) => {
        $('#message-form').submit();
    });

    $('#message-form').on('submit', (event) => {
        event.preventDefault();
        let msg = $('#msg').val().trim();

        if (msg === ' ' || !msg) return;

        socket.emit('privateMessage', {
            body: msg,
            senderId: senderId,
            receiverId: receiverId
        }, () => {
            $('#msg').val('');
        });
    });

    socket.on('newPrivateMessage', (data) => {
        console.log(data);
        let darker = ' darker';
        if (senderId === data.senderId) {
            darker = '';
        }
        const message = `
        <div class="container${darker}">
        <p class="senderId">${data.senderId}</p>
        <p>${data.body}</p>
        <span class="time-right">${data.createdAt}</span>
    </div>`;

        $('#messages').append(message);
    });
}