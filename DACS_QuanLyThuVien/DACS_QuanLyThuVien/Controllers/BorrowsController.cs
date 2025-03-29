using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DACS_QuanLyThuVien.Data;
using DACS_QuanLyThuVien.Models;

namespace DACS_QuanLyThuVien.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BorrowsController : ControllerBase
    {
        private readonly LibraryContext _context;

        public BorrowsController(LibraryContext context)
        {
            _context = context;
        }

        // ✅ Lấy tất cả lượt mượn
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Borrow>>> GetBorrows()
        {
            var result = await _context.Borrows
                .Include(b => b.Book)
                .Include(b => b.Student)
                .ToListAsync();

            return Ok(result);
        }

        // ✅ Lấy chi tiết lượt mượn theo ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Borrow>> GetBorrow(int id)
        {
            var borrow = await _context.Borrows
                .Include(b => b.Book)
                .Include(b => b.Student)
                .FirstOrDefaultAsync(b => b.Id == id);

            return borrow == null ? NotFound() : Ok(borrow);
        }

        // ✅ Thêm lượt mượn
        [HttpPost]
        public async Task<ActionResult<Borrow>> PostBorrow(Borrow borrow)
        {
            _context.Borrows.Add(borrow);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBorrow), new { id = borrow.Id }, borrow);
        }

        // ✅ Sửa lượt mượn
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBorrow(int id, Borrow borrow)
        {
            if (id != borrow.Id) return BadRequest();

            _context.Entry(borrow).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BorrowExists(id)) return NotFound();
                throw;
            }

            return NoContent();
        }

        // ✅ Xoá lượt mượn
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBorrow(int id)
        {
            var borrow = await _context.Borrows.FindAsync(id);
            if (borrow == null) return NotFound();

            _context.Borrows.Remove(borrow);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // 🔒 Hàm kiểm tra tồn tại
        private bool BorrowExists(int id) =>
            _context.Borrows.Any(b => b.Id == id);
    }
}
