const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  store: async (req, res, next) => {
    try {
      let { name, email, password, identity_type, identity_number, address } =
        req.body;

      let exist = await prisma.user.findFirst({
        where: { email },
      });

      if (exist) {
        return res.status(400).json({
          status: false,
          message: "email already used!",
        });
      }

      let user = await prisma.user.create({
        data: {
          name,
          email,
          password,
          profiles: {
            create: { identity_type, identity_number, address },
          },
        },
        include: {
          profiles: true,
        },
      });

      res.status(201).json({
        status: true,
        message: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  index: async (req, res, next) => {
    try {
      let user = await prisma.user.findMany();
      res.status(201).json({
        status: true,
        message: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      let id = Number(req.params.id);
      let user = await prisma.user.findUnique({
        where: { id }, 
        include: {
          profiles: true,
        },
      });

      if (!user) {
        return res.status(400).json({
          status: false,
          message: "can\t find user with id " + id,
          data: null,
        });
      }
      res.status(200).json({
        status: true,
        message: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
};
