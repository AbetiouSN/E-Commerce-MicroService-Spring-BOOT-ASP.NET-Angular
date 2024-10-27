using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using ProductManagemntService.Models;

public class Image
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public long Id { get; set; }

    [Column(TypeName = "LONGTEXT")]
    public string Source { get; set; }

    // Make Produit optional in the JSON data
    [JsonIgnore]
    public Product Produit { get; set; }

    // Foreign key to Product
    public int? ProduitId { get; set; }
}
