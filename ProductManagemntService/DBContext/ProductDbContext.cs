using Microsoft.EntityFrameworkCore;
using ProductManagemntService.Models;

namespace ProductManagemntService.DBContext
{
    public class ProductDbContext : DbContext
    {
        public ProductDbContext(DbContextOptions<ProductDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}
