using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace whatsAppClone.Models
{
    public class Rate
    {
        [Key]
        public int Id { set; get; }
        public int Rating { set; get; }
        public string Name { set; get; }
        public string FeedBack { set; get; }
    }
}
