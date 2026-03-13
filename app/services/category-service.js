const utils = require('../common/utils');
const leaderboardRepository = require('../data/leaderboard-repository');

const categoryService = {};

let initialized = false;
let sections = [];
let sectionModels = [];
let categories = [];
let categoryModels = [];
let categoryModelsById = {};
let categoriesById = {};
let categoriesByUrlName = {};

categoryService.getSectionModels = async function()
{
  await initialize();
  return sectionModels;
};

categoryService.getCategories = async function()
{
  await initialize();
  return categories;
};

categoryService.getCategory = async function(id)
{
  await initialize();
  return categoriesById[id];
};

categoryService.getCategoryModel = async function(id)
{
  await initialize();
  return categoryModelsById[id];
};

categoryService.getCategoryByUrlName = async function(urlName)
{
  if (!urlName)
    return null;

  await initialize();
  return categoriesByUrlName[urlName.toLowerCase()];
};

async function initialize()
{
  if (initialized)
    return;

  sections = await leaderboardRepository.getSections();
  categories = await leaderboardRepository.getCategories();

  for (const category of categories)
  {
    if (category.SectionId !== null)
    {
      category.Section = sections.find(s => s.Id === category.SectionId);
    }

    if (category.ParentId !== null)
    {
      category.Parent = categories.find(c => c.Id === category.ParentId);
    }
  }

  for (const category of categories)
  {
    category.Subcategories = categories.filter(c => c.Parent === category).toSorted((a, b) => a.DisplayOrder - b.DisplayOrder);
    category.DefaultSubcategory = category.Subcategories[0];
  }

  for (const section of sections)
  {
    section.Categories = categories.filter(c => c.Section === section).toSorted((a, b) => a.DisplayOrder - b.DisplayOrder);
  }
  
  categoryModels = categories.map(mapCategory);

  const visibleSections = categories
    .filter(c => c.Section && c.Visible)
    .map(c => c.Section);

  sectionModels = [ ...new Set(visibleSections) ]
    .toSorted((a, b) => a.Id - b.Id)
    .map(mapSection);

  for (const categoryModel of categoryModels)
  {
    categoryModelsById[categoryModel.Id] = categoryModel;
  }

  for (const category of categories)
  {
    categoriesById[category.Id] = category;

    if (category.UrlName)
    {
      // Convert UrlName to lowercase for case-insentivie lookups later
      categoriesByUrlName[category.UrlName.toLowerCase()] = category;
    }
  }

  initialized = true;
}

function mapCategory(category)
{
  const categoryModel = { ...category };

  if (category.Parent)
  {
    categoryModel.FullName = `${category.Parent.Name} ${category.Name}`;
    categoryModel.SectionName = category.Parent.Section.Name;

    if (utils.isNullOrWhitespace(categoryModel.WikiUrl))
    {
      categoryModel.WikiUrl = category.Parent.WikiUrl;
    }
  }
  else
  {
    categoryModel.FullName = category.Name;
    categoryModel.SectionName = category.Section.Name;
  }

  if (!categoryModel.ShortName)
  {
    // If no short name is configured, use the regular name
    categoryModel.ShortName = category.Name;
  }

  if (!categoryModel.UrlName && category.DefaultSubcategory)
  {
    categoryModel.UrlName = category.DefaultSubcategory.UrlName;
  }

  if (categoryModel.UrlName)
  {
    categoryModel.LinkUrl = `/Leaderboard/${categoryModel.UrlName}`;
  }

  return categoryModel;
}

function mapSection(section)
{
  const sectionModel =
  {
    Name: section.Name,
    Categories: section.Categories
      .filter(c => c.Visible)
      .map(c => categoryModels.find(i => i.Id === c.Id))
  };

  return sectionModel;
}

module.exports = categoryService;
