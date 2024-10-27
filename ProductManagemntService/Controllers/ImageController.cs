using Microsoft.AspNetCore.Mvc;
using ProductManagemntService.DBContext;
using ProductManagemntService.Models;

namespace ProductManagemntService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly ProductDbContext _context;

        public ImageController(ProductDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<Image>> PostImage([FromBody] Image image)
        {
            if (image == null)
            {
                return BadRequest(new { message = "L'image est requise." });
            }

            // Vérifiez si l'ID du produit est défini
            if (image.Produit.Id <= 0)
            {
                return BadRequest(new { message = "L'ID du produit est requis." });
            }

            // Ajout de l'image à la base de données
            _context.Images.Add(image);
            await _context.SaveChangesAsync();

            // Retourner une réponse indiquant que l'image a été créée
            return CreatedAtAction(nameof(GetImageById), new { id = image.Id }, image);
        }

        // Exemple de méthode pour récupérer une image par ID (à ajouter)
        [HttpGet("{id}")]
        public async Task<ActionResult<Image>> GetImageById(long id)
        {
            var image = await _context.Images.FindAsync(id);

            if (image == null)
            {
                return NotFound();
            }

            return image;
        }
    }
}

