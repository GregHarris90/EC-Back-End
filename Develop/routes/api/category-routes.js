const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET ALL 
router.get('/', async (req, res) => {
  try {
    // find all categories
    const categoryData = await Category.findAll({
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
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ONE
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

// CREATE
router.post('/', async (req, res) => {
  try {
    // create a new category
    const categoryData = await Category.create(req.body);

    // send created category
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    // update a category by its `id` value
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // if not selected category send 404 message
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category found with this id!' })
    }

    // send updated category
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    // delete a category by its `id` value
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    // if not selected category send 404 message
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    // send deleted category
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
