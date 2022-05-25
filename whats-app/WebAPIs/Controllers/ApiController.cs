using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using whatsAppClone.Models;

namespace WebAPIs.Controllers
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
                db.Entry(con).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Deleted;
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
        public ActionResult Contacts([FromForm] string username)
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
        public ActionResult Messages([FromForm] string username)
        {
            try
            {
                List<Messages> con = db.Messages.Where(o => o.ToUserName == username).OrderByDescending(p => p.Id).ToList();
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
        [Route("/api/info/")]
        [HttpPost]
        public ActionResult Info([FromForm] string username)
        {
            try
            {
                Users use = db.Users.FirstOrDefault(o => o.Username == username);
                if (use == null || use.Username != username)
                    return Json(new { code = HttpStatusCode.NotFound, error = "username does not exist" });
                else
                {
                    List<Contacts> conts = db.Contacts.Where(o => o.UserName == username).ToList();
                    List<object> cons = new List<object>();
                    foreach (Contacts item in conts)
                    {
                        if (item != null)
                        {
                            Users us = db.Users.FirstOrDefault(o => o.Username == item.FriendUserName);
                            if (us != null || us.Username == item.UserName)
                            {
                                object temps = new
                                {
                                    id = item.Id,
                                    username = us.Username,
                                    displayName = us.Inname
                                };
                                if (!cons.Contains(temps))
                                    cons.Add(temps);
                            }
                        }
                    }
                    List<object> chats = new List<object>();
                    object temp = new
                    {
                        displayname = use.Inname,
                        avatar = use.avatar,
                        contacts = cons,
                        chats = chats
                    };
                    return Json(new { code = HttpStatusCode.OK, data = temp });
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        [EnableCors("AllowOrigin")]
        [Route("/api/register/")]
        [HttpPost]
        public ActionResult Register(IFormFile avatar, [FromForm] string username, [FromForm] string name, [FromForm] string password)
        {
            try
            {
                Users use = db.Users.Where(o => o.Username == username).FirstOrDefault();
                if (use != null && use.Username == username)
                    return Json(new { code = HttpStatusCode.Conflict, error = "user already exist!" });
                else
                {
                    string p = null;
                    var filePath = p;
                    if (avatar != null)
                    {
                        //string ext = Path.GetExtension(avatar.FileName);
                        //var path = Path.Combine(Server.("~/images/" + avatar.FileName));
                        //avatar.SaveAs(path);
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {

                            avatar.CopyToAsync(stream);
                            p = "wwwroot/images/" + "00" + avatar.FileName;
                        }
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
                    return Json(new { code = HttpStatusCode.OK });
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
                    return Json(new { code = HttpStatusCode.NoContent, error = "wrong username or password" });
                }
                else
                {
                    List<Contacts> conts = db.Contacts.Where(o => o.UserName == username).ToList();
                    List<object> cons = new List<object>();
                    foreach (Contacts item in conts)
                    {
                        if (item != null)
                        {
                            Users us = db.Users.FirstOrDefault(o => o.Username == item.FriendUserName);
                            if (us != null || us.Username == item.UserName)
                            {
                                object temps = new
                                {
                                    id = item.Id,
                                    username = us.Username,
                                    displayName = us.Inname
                                };
                                if (!cons.Contains(temps))
                                    cons.Add(temps);
                            }
                        }
                    }
                    List<object> chats = new List<object>();
                    object temp = new
                    {
                        displayname = u.Inname,
                        avatar = u.avatar,
                        contacts = cons,
                        chats = chats
                    };
                    return Json(new { code = HttpStatusCode.OK, data = temp });
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
        public ActionResult NewContact([FromForm] string uname, [FromForm] string fusername)
        {
            try
            {
                Contacts con = db.Contacts.FirstOrDefault(o => o.UserName == uname && o.FriendUserName == fusername);
                if (con != null)
                {
                    return Json(new { code = HttpStatusCode.Conflict, error = "already a friend" });
                }
                else
                {
                    Users u = db.Users.FirstOrDefault(o => o.Username == uname);
                    Users f = db.Users.FirstOrDefault(o => o.Username == fusername);
                    if (u == null || f == null)
                        return Json(new { code = HttpStatusCode.NotFound, error = "doesn't exist" });
                    if (u.Username != uname || f.Username != fusername)
                        return Json(new { code = HttpStatusCode.NotFound, error = "doesn't exist" });
                    Contacts cont = new Contacts()
                    {
                        UserName = uname,
                        FriendUserName = fusername
                    };
                    Contacts cons = new Contacts()
                    {
                        UserName = fusername,
                        FriendUserName = uname
                    };
                    object temp = new
                    {
                        username = f.Username,
                        displayName = f.Inname,
                        avatar = f.avatar
                    };
                    db.Contacts.Add(cont);
                    db.Contacts.Add(cons);
                    db.SaveChanges();
                    return Json(new { code = HttpStatusCode.OK, data = temp });
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }

}
