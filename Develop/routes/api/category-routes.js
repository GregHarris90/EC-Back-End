const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // find all categories
    const categoriesData = await Category.findAll({
      // be sure to include its associated Products
      include: [
        {
          model: Product,
          attributes: ['product_name']
        },
      ]
    },
    );

    // send all categories
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // find one category by its `id` value
    const categoryData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [
        {
          model: Product,
          attributes: ['product_name']
        }
      ]
    });

    // if not selected category send 404 message
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
    }

    // send one category 
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
