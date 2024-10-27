using System.ComponentModel.DataAnnotations;

namespace ProductManagemntService.Models
{
    public class ProductCreateDto
    {
        [Required]
        [MaxLength(100)]
        public string Nom { get; set; }

        [MaxLength(500)]
        public string Description { get; set; }

        [Range(0, int.MaxValue)]
        public int Quantity { get; set; }

        [Range(0, double.MaxValue)]
        public decimal Prix { get; set; }

        public List<string> Images { get; set; } // List of image sources (URLs or base64)
    }
}
