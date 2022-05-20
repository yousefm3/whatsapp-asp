using System.ComponentModel.DataAnnotations;

namespace Whatsapp_asp.Models
{
    public class Rating
    {
        [Key]
        [Required]
        [MaxLength(20)]
        public string Name { get; set; }

        [MaxLength(200)]
        public string FeedBack { get; set; }

        [Range(1, 5)]
        [Required]
        public int Raiting { get; set; }

        public DateTime Date { get; set; }
    }
}
