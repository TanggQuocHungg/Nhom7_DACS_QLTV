using Microsoft.AspNetCore.Identity;

namespace DACS_QuanLyThuVien.Data
{
    public static class DbInitializer
    {
        /// <summary>
        /// Tạo các vai trò mặc định nếu chưa tồn tại trong hệ thống
        /// </summary>
        public static async Task SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            var roles = new HashSet<string> { "Admin", "Librarian", "Teacher", "Student" };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }
        }
    }
}
