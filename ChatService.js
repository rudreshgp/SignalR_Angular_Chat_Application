ChatModule.factory('ChatService', ['$http', '$q', '$filter', function ($http, $q, $filter) {
    ChatDropdownModel = [
        {
            class: 'fa fa-circle text-green',
            text: 'Online',
            selected: true,
            id: 1
        },
        {
            class: 'fa fa-circle text-orange',
            text: 'Away',
            selected: false,
            id: 2
        },
        {
            class: 'fa fa-circle text-orange',
            text: 'Offline',
            selected: false,
            id: 3
        },
    ];

    ChatData = [
        {
            Date: new Date('2016,1,1'),
            Order: 1,
            Chats: [
                {
                    SenderId: 1,
                    MessageOrder: 1,
                    SenderName: 'Jane Smith',
                    Message: 'Hi, I wanted to make sure you got the latest product report. Did Roddy get it to you?',
                    SentTimings: new Date('January 1 2016 12:23:00 PM')
                },
                {
                    SenderId: 1,
                    MessageOrder: 5,
                    SenderName: 'Jane Smith',
                    Message: 'No not yet, the transaction hasn\'t cleared yet. I will let you know as soon as everything goes through. Any idea where you want to get lunch today?',
                    SentTimings: new Date('January 1 2016 12:23:00 PM')
                },
                {
                    SenderId: 2,
                    MessageOrder: 3,
                    SenderName: 'John Smith',
                    Message: 'Yeah I did. Everything looks good. Did you have an update on purchase order #302?',
                    SentTimings: new Date('January 1 2016 12:23:00 PM')
                },
                {
                    SenderId: 2,
                    MessageOrder: 4,
                    SenderName: 'John Smith',
                    Message: 'Yeah I did?',
                    SentTimings: new Date('January 1 2016 12:24:00 PM')
                }
            ]
        },
        {
            Date: new Date('2016,1,2'),
            Order: 2,
            Chats: [
            {
                SenderId: 1,
                MessageOrder: 1,
                SenderName: 'Jane Smith',
                Message: 'Hi,',
                SentTimings: new Date('January 2 2016 12:23:00 PM')
            }]
        },
    ];
    CurrentStatus = 'Online',
    SenderId = 1;
    MessageOrder = 1;
    CurrentUser = 'Jane Smith';;
    SendMessage = function (message) {
        var chat = {
            SenderId: this.SenderId,
            MessageOrder: 1,
            SenderName: this.CurrentUser,
            Message: message,
            SentTimings: Date.now()
        };
        PushMessage(chat);
    };
    NewMessage = function (messageObject) {
        var chat = {
            SenderId: messageObject.SenderId,
            MessageOrder: 1,
            SenderName: messageObject.CurrentUser,
            Message: messageObject.Message,
            SentTimings: Date.now()
        };
        PushMessage(chat);
    }
    PushMessage = function (chatObject) {
        var todaysMessage = $filter('filter')(this.ChatData, { Date: new Date(Date.now()).setHours(0, 0, 0, 0) })[0];
        if (todaysMessage != null && todaysMessage != undefined) {
            chatObject.MessageOrder = this.ChatData.length + 1;
            todaysMessage.Chats.push(chatObject);
        }
        else {
            var newMessage = {
                Date: new Date(Date.now()).setHours(0, 0, 0, 0),
                Order: 1,
                Chats: [
                    chatObject
                ]
            };
            ChatData.push(newMessage);
        }
    };
    UpdateDropdownStatus = function (statusObject) {
        var currentStatusObject = $filter('filter')(this.ChatDropdownOptions, { selected: true })[0];
        currentStatusObject.selected = false;
        var newStatusObject = $filter('filter')(this.ChatDropdownOptions, { id: statusObject.id })[0];
        newStatusObject.selected = true;
        this.CurrentStatus = newStatusObject.text;
    };

    return {
        ChatDropdownOptions: ChatDropdownModel,
        ChatData: ChatData,
        CurrentStatus: CurrentStatus,
        SenderId: SenderId,
        CurrentUser: CurrentUser,
        MessageOrder: MessageOrder,
        SendMessage: SendMessage,
        UpdateDropdownStatus: UpdateDropdownStatus,
        NewMessage: NewMessage
    };
}]);
