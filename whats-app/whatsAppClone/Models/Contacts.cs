using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace whatsAppClone.Models
{
    public class Contacts
    {
        [Key]
        public int Id
        {
            set;
            get;
        }
        public string UserName
        {
            set;
            get;
        }
        public string FriendUserName
        {
            set;
            get;
        }
    }

}
