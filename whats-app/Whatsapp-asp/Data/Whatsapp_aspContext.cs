#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Whatsapp_asp.Models;

namespace Whatsapp_asp.Data
{
    public class Whatsapp_aspContext : DbContext
    {
        public Whatsapp_aspContext (DbContextOptions<Whatsapp_aspContext> options)
            : base(options)
        {
        }

        public DbSet<Whatsapp_asp.Models.Rating> Rating { get; set; }
    }
}
