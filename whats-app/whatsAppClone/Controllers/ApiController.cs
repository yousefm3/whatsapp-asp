using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using whatsAppClone.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.IO;
using Microsoft.AspNetCore.Cors;

namespace whatsAppClone.Controllers
{
    [ApiController]
    public class ApiController : Controller
    {
        private readonly Context db;
        public ApiController(Context _db)
        {
            db = _db;
        }
        [EnableCors("AllowOrigin")]
        [Route("/api/search")]
        [HttpGet]
        public ActionResult search(string username, string query)
        {
            try
            {
                Contacts con = db.Contacts.FirstOrDefault(o => o.UserName == username && o.FriendUserName == query);
                if (con == null)
                    return Json(new { code = HttpStatusCode.NoContent });
                else
                {
                    Users use = db.Users.FirstOrDefault(o => o.Username == con.FriendUserName);
                    object temp = new
                    {
                        username = use.Username,
                        inname = use.Inname,
                        server = use.server,
                        avatar = use.avatar
                    };
                    return Json(new { code = HttpStatusCode.OK, result = temp });
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        [EnableCors("AllowOrigin")]
        [Route("/api/deltecontact/")]
       [HttpDelete]
       public ActionResult DeleteConact(int ContactID)
        {
            try
            {
                Contacts con = db.Contacts.FirstOrDefault(o => o.Id == ContactID);
                db.Contacts.Remove(con);
                db.Entry(con).State = EntityState.Deleted;
                db.SaveChanges();
                return Json(new { code = HttpStatusCode.OK });
            }
            catch (Exception)
            {

                throw;
            }
        }
        [EnableCors("AllowOrigin")]
        [Route("/api/contacts/")]
        [HttpPost]
        public ActionResult Contacts(string username)
        {
            try
            {
                List<Contacts> con = db.Contacts.Where(o => o.UserName == username).ToList();
                List<object> Obj = new List<object>();
                foreach (Contacts item in con)
                {
                    if (item != null)
                    {
                        Users f = db.Users.FirstOrDefault(o => o.Username == item.FriendUserName);
                        object temp = new
                        {
                            id = item.Id,
                            name = item.FriendUserName,
                            avatar = f.avatar,
                            server = f.server
                        };
                        if (!Obj.Contains(temp))
                            Obj.Add(temp);
                    }
                }
                return Json(new { code = HttpStatusCode.OK, contacts = Obj });
            }
            catch (Exception)
            {

                throw;
            }
        }
        [EnableCors("AllowOrigin")]
        [Route("/api/messages")]
        [HttpPost]
        public ActionResult Messages(string username)
        {
            try
            {
                List<Messages> con = db.Messages.Where(o => o.ToUserName == username).OrderByDescending(p=>p.Id).ToList();
                List<object> Obj = new List<object>();
                foreach (Messages item in con)
                {
                    if (item != null)
                    {
                        Users frm = db.Users.FirstOrDefault(o => o.Username == item.FromUserName);
                        Users to = db.Users.FirstOrDefault(o => o.Username == item.ToUserName);
                        object temp = new
                        {
                            id = item.Id,
                            from = item.FromUserName,
                            to = item.ToUserName,
                            message = item.Content,
                            opened = item.Opened,
                            fromAvatar = frm.avatar,
                            toAvatar = to.avatar,
                            fromServer = frm.server,
                            toServer = to.server
                        };
                        if (!Obj.Contains(temp))
                            Obj.Add(temp);
                    }
                }
                return Json(new { code = HttpStatusCode.OK, messages = Obj });
            }
            catch (Exception)
            {

                throw;
            }
        }
        [EnableCors("AllowOrigin")]
        [Route("/api/register/")]
        [HttpPost]
        public ActionResult Register(string username, string name, string password, IFormFile avatar)
        {
            try
            {
                Users use = db.Users.Where(o => o.Username == username).FirstOrDefault();
                if (use != null)
                    return Json(new { code = HttpStatusCode.Conflict, error = "user already exist!" });
                else
                {
                    var filePath = Path.GetTempFileName();
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        avatar.CopyToAsync(stream);
                    }
                    Users u = new Users()
                    {
                        Username = username,
                        Password = password,
                        Inname = name,
                        server = "localhost:4444",
                        avatar = filePath
                    };
                    db.Users.Add(u);
                    db.SaveChanges();
                    return Json(new { code = HttpStatusCode.OK});
                }

            }
            catch (Exception)
            {

                throw;
            }
        }
        [EnableCors("AllowOrigin")]
        [Route("/api/login")]
        [HttpGet]
        public ActionResult Login(string username, string password)
        {
            try
            {
                Users u = db.Users.FirstOrDefault(o => o.Username == username && o.Password == password);
                if (u == null)
                {
                    return Json(new { code = HttpStatusCode.NoContent });
                }
                else
                {
                    return Json(new { code = HttpStatusCode.OK });
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        [EnableCors("AllowOrigin")]
        [Route("/api/newcontact")]
        [HttpPost]
        public ActionResult NewContact(string uname, string fusername)
        {
            try
            {
                Contacts con = db.Contacts.FirstOrDefault(o => o.UserName == uname && o.FriendUserName == fusername);
                if (con != null)
                {
                    return Json(new { code = HttpStatusCode.Conflict });
                }
                else
                {
                    Contacts cont = new Contacts()
                    {
                        UserName = uname,
                        FriendUserName = fusername
                    };
                    db.Contacts.Add(cont);
                    db.SaveChanges();
                    return Json(new { code = HttpStatusCode.OK });
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
