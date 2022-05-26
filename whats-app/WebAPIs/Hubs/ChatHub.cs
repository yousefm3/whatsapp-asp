using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using whatsAppClone.Models;

namespace whatsAppClone.Hubs
{
    public class ChatHub : Hub
    {
        private readonly Context db;
        private readonly IDictionary<string, userConnection> cons;
        public ChatHub(Context _db, IDictionary<string, userConnection> _cons)
        {
            db = _db;
            cons = _cons;
        }
        [EnableCors("AllowOrigin")]
        public override Task OnDisconnectedAsync(Exception exception)
        {

            if (cons.TryGetValue(Context.ConnectionId, out userConnection userConnection))
            {
                cons.Remove(Context.ConnectionId);
            }

            return base.OnDisconnectedAsync(exception);
        }
        [EnableCors("AllowOrigin")]
        public async Task SendMessage(string _from, string _to, string _content, string join)
        {
                string f = _from;
                string t = _to;
                string c = _content;
                Users from = db.Users.Where(o => o.Username == f).FirstOrDefault();
                Users to = db.Users.Where(o => o.Username == t).FirstOrDefault();
                object from_ = new
                {
                    username = from.Username,
                    displayName = from.Inname,
                    avatar = from.avatar
                };
                object to_ = new
                {
                    username = to.Username,
                    displayName = to.Inname,
                    avatar = to.avatar
                };
                object messagesData = new
                {
                    from = from_,
                    to = to_,
                    content = c,
                    time = DateTime.Now
                };
                await Clients.AllExcept(join)
                    .SendAsync("ReceiveMessage", messagesData);
        }
        [EnableCors("AllowOrigin")]
        public async Task JoinRoom(string join) 
        {
            //cons[Context.ConnectionId] = userConnection;
            await Groups.AddToGroupAsync(Context.ConnectionId, join);
            //Users from = db.Users.Where(o => o.Username == userConnection.from).FirstOrDefault();
            //Users to = db.Users.Where(o => o.Username == userConnection.to).FirstOrDefault();
            //object from_ = new
            //{
            //    username = from.Username,
            //    displayName = from.Inname,
            //    avatar = from.avatar
            //};
            //object to_ = new
            //{
            //    username = to.Username,
            //    displayName = to.Inname,
            //    avatar = to.avatar
            //};
            //object message = new
            //{
            //    from = from_,
            //    to = to_,
            //    content = userConnection.content,
            //    time = DateTime.Now
            //};
            //await Clients.Group(userConnection.Room).SendAsync("ReciveMessage");//, message);
        }
    }
}
