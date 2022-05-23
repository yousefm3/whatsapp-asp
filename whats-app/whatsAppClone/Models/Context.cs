using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace whatsAppClone.Models
{
    public class Context : DbContext
    {
            public Context(DbContextOptions options) : base(options) { }
            public DbSet<Contacts> Contacts
            {
                set;
                get;
            }
            public DbSet<Users> Users
            {
                set;
                get;
            }
            public DbSet<Messages> Messages
            {
                set;
                get;
            }
            public DbSet<Rate> Rate
            {
                set;
                get;
            }
    }
}
