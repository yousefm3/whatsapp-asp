using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace whatsAppClone.Models
{
    public class Users
    {
        [Key]
        public int Id
        {
            set;
            get;
        }
        public string avatar
        {
            set;
            get;
        }
        public string server
        {
            set;
            get;
        }
        public string Username
        {
            set;
            get;
        }
        public string Password
        {
            set;
            get;
        }
        public string Inname
        {
            set;
            get;
        }
    }
}
