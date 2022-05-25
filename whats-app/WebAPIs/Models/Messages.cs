using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace whatsAppClone.Models
{
    public class Messages
    {
        [Key]
        public int Id { set; get; }
        public string Content { set; get; }
        public bool Opened { set; get; }
        public string ToUserName { set; get; }
        public string FromUserName { set; get; }
    }
}
