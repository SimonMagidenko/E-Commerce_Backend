const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [
        { model: Product },
      ],
    })
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryById = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    res.json(categoryById)
  } catch (error) {
    res.status(500).json(error);
  };
});

router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updatedRowCount, [updatedCategory]] = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    });

    if (updatedRowCount === 0) {
      res.status(404).json({ message: 'No Category found with this id!' });
    } else {
      res.status(200).json(updatedCategory);
    };
  } catch (err) {
    res.status(400).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
