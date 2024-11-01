using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagemntService.DBContext;
using ProductManagemntService.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ProductManagemntService.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ProductDbContext _context;

        public ProductsController(ProductDbContext context)
        {
            _context = context;
        }
        [Authorize(Roles = "ADMIN,USER")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct(ProductCreateDto productCreateDto)
        {
            if (productCreateDto == null)
            {
                return BadRequest("Product data is required.");
            }

            // Map DTO to entity
            var product = new Product
            {
                Nom = productCreateDto.Nom,
                Description = productCreateDto.Description,
                Quantity = productCreateDto.Quantity,
                Prix = productCreateDto.Prix,
                Images = productCreateDto.Images.Select(image => new Image { Source = image }).ToList()
            };

            // Add product to the database
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(CreateProduct), new { id = product.Id }, product);
        }


        [Authorize(Roles = "ADMIN,USER")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts()
        {
            var products = await _context.Products
                .Include(p => p.Images) // Include images for each product
                .ToListAsync();

            return Ok(products);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpPost("{productId}/images")]
        public async Task<IActionResult> AddImagesToProduct(int productId, [FromBody] List<string> images)
        {
            // Check if product exists
            var product = await _context.Products
                .Include(p => p.Images)
                .FirstOrDefaultAsync(p => p.Id == productId);

            if (product == null)
            {
                return NotFound("Product not found.");
            }

            // Add each image to the product
            foreach (var image in images)
            {
                product.Images.Add(new Image { Source = image });
            }

            // Save changes to the database
            await _context.SaveChangesAsync();

            return Ok("Images added successfully.");
        }




        [Authorize(Roles = "USER")]
        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> UpdateProduct(int id, ProductCreateDto productUpdateDto)
        {
            if (id <= 0 || productUpdateDto == null)
            {
                return BadRequest("Invalid product data.");
            }
            var product = await _context.Products
                .Include(p => p.Images) // Include images to manage them if necessary
                .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            // Update product properties
            product.Nom = productUpdateDto.Nom;
            product.Description = productUpdateDto.Description;
            product.Quantity = productUpdateDto.Quantity;
            product.Prix = productUpdateDto.Prix;

            // Optionally, update the images
            product.Images.Clear(); // Clear existing images
            product.Images = productUpdateDto.Images.Select(image => new Image { Source = image }).ToList();

            // Save changes to the database
            await _context.SaveChangesAsync();

            return NoContent(); // Return 204 No Content on success
        }


        [Authorize(Roles = "ADMIN")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Invalid product ID.");
            }

            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound($"Product with ID {id} not found.");
            }

            // Remove the product from the database
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent(); // Return 204 No Content on success
        }



    }
}
