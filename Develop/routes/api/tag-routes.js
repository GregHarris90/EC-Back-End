const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET ALL tags
router.get('/', async (req, res) => {
  try {
    // find all tags
    const tagData = await Tag.findAll({
      // be sure to include its associated Product data
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        },
      ]
    });

    // send all tags (include product & product-tag)
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ONE tag
router.get('/:id', async (req, res) => {
  try {
    // find a single tag by its `id`
    const tagData = await Tag.findByPk(req.params.id, {
      // be sure to include its associated Product data
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        },
      ]
    });

    // if not selected tag send 404 message
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
    }

    // send all tags (include product & product-tag)
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a tag
router.post('/', async (req, res) => {
  try {
    // create a new tag
    const tagData = await Tag.create(req.body);

    // send created tag
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// UPDATE a tag
router.put('/:id', async (req, res) => {
  try {
    // update a tag's name by its `id` value
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // if not selected tag send 404 message
    if (!tagData[0]) {
      res.status(404).json({ message: 'No tag found with this id!' })
    }

    // send updated tag
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a tag
router.delete('/:id', async (req, res) => {
  try {
    // delete on tag by its `id` value

    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    // if not selected tag send 404 message
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    // send deleted tag
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
