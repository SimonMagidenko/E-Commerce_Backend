const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [
        { model: Product, through: ProductTag, as: "product_tags" }
      ],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.get('/:id', async (req, res) => {
  try {
    const tagById = await Tag.findOne({
      where: {
        id: req.params.id,
      },

      include: [
        {
          model: Product, through: ProductTag, as: "product_tags"
        }
      ]
    });
    res.json(tagById)
  } catch (error) {
    res.status(500).json(error);
  };
});


router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updatedRowCount] = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updatedRowCount === 0) {
      res.status(404).json({ message: 'No Update found' });
    } else {
      res.status(200).json(updatedRowCount);
    };
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  };
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: "No category found with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
