const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  store: async (req, res, next) => {
    try {
      let { name, email, password, identity_type, identity_number, address } =
        req.body;

      if (
        !name ||
        !email ||
        !password ||
        !identity_type ||
        !identity_number ||
        !address
      ) {
        return res.status(400).json({
          status: false,
          message: "Input must be required",
          data: null,
        });
      }

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
      let users = await prisma.user.findMany();
      res.status(200).json({
        status: true,
        message: "success",
        data: users,
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
        return res.status(404).json({
          status: false,
          message: "Cannot find user with id " + id,
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
  update: async (req, res, next) => {
    let id = Number(req.params.id);
    try {
      let { name, email, password, identity_type, identity_number, address } =
        req.body;

      if (
        !name &&
        !email &&
        !password &&
        !identity_type &&
        !identity_number &&
        !address
      ) {
        return res.status(400).json({
          status: false,
          message: "At least one field must be provided for update",
          data: null,
        });
      }

      let user = await prisma.user.update({
        where: { id },
        data: {
          name,
          email,
          password,
          profiles: {
            update: { identity_type, identity_number, address },
          },
        },
        include: {
          profiles: true,
        },
      });
      res.status(200).json({
        status: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  },
  destroy: async (req, res, next) => {
    let id = Number(req.params.id);
    try {

      await prisma.profile.deleteMany({
        where: { user_id: id },
      });
      
      await prisma.user.delete({
        where: { id },
      });

      res.status(200).json({
        status: true,
        message: "User deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
