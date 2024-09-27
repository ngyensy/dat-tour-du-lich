using AutoMapper;
using System.Collections.Generic;
using System.Linq;
using WebApi.Entities;
using WebApi.Helpers;
using WebApi.Models;

namespace WebApi.Services
{
    public interface ICategoryService
    {
        IEnumerable<CategoryModel> GetAll();
        CategoryModel GetById(int id);
        void Create(CategoryModel category);
        void Update(int id, CategoryModel category);
        void Delete(int id);
    }

    namespace WebApi.Services
    {
        public class CategoryService : ICategoryService
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public CategoryService(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public IEnumerable<CategoryModel> GetAll()
            {
                var categories = _context.Categories.ToList();
                return _mapper.Map<IEnumerable<CategoryModel>>(categories);
            }

            public CategoryModel GetById(int id)
            {
                var category = _context.Categories.Find(id);
                return _mapper.Map<CategoryModel>(category);
            }

            public void Create(CategoryModel categoryModel)
            {
                var categoryEntity = _mapper.Map<Category>(categoryModel);
                _context.Categories.Add(categoryEntity);
                _context.SaveChanges();
            }

            public void Update(int id, CategoryModel categoryModel)
            {
                var existingCategory = _context.Categories.Find(id);
                if (existingCategory == null) return;

                _mapper.Map(categoryModel, existingCategory);
                _context.Categories.Update(existingCategory);
                _context.SaveChanges();
            }

            public void Delete(int id)
            {
                var category = _context.Categories.Find(id);
                if (category == null) return;

                _context.Categories.Remove(category);
                _context.SaveChanges();
            }
        }
    }
}
