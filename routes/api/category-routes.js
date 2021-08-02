const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  console.log('\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/');
  Category.findAll({
    include: {
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      model: Product
    }
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  console.log('\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/');
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      model: Product
    }
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with that id' })
        return;
      } res.json(dbCategoryData)
    }).catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  console.log('\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/');
  Category.create({
    category_name: req.body.category_name
  })
    .then((dbCategoryData) => res.json(dbCategoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  console.log('\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/');
  Category.update(
    req.body, {
    where: {
      id: req.params.id
    }
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData[0]) {
        res.status(404).json({ message: 'No category found with that id' })
        return;
      } res.json(dbCategoryData)
    }).catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  console.log('\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/');
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No category found with that id' })
        return;
      } res.json(dbCategoryData)
    }).catch((err) => {
      console.log(err);
      res.json(err);
    });
});

module.exports = router;
