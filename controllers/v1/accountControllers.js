const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  register: async (req, res, next) => {
    try {
      let { bank_name, bank_account_number, balance, user_id } = req.body;

      if (!bank_name || !bank_account_number) {
        return res.status(400).json({
          status: false,
          message: "Input must be required",
          data: null,
        });
      } else if (!balance || balance < 50000) {
        return res.status(400).json({
          status: false,
          message: "Balance must be at least 50000",
          data: null,
        });
      } else if (!user_id || user_id === 0) {
        return res.status(400).json({
          status: false,
          message: "User_id must be required and more than 0",
          data: null,
        });
      }

      let exist = await prisma.user.findUnique({
        where: { id: user_id },
      });

      if (!exist) {
        return res.status(404).json({
          status: false,
          message: `User with id ${user_id} not found`,
          data: null,
        });
      }

      let account = await prisma.account.create({
        data: {
          bank_name,
          bank_account_number,
          balance,
          user: { connect: { id: user_id } },
        },
      });

      res.status(201).json({
        status: true,
        message: "success",
        data: account,
      });
    } catch (error) {
      next(error);
    }
  },
  index: async (req, res, next) => {
    try {
      let accounts = await prisma.account.findMany();
      res.status(200).json({
        status: true,
        message: "success",
        data: accounts,
      });
    } catch (error) {
      next(error);
    }
  },
  show: async (req, res, next) => {
    try {
      let id = Number(req.params.id);
      let accounts = await prisma.account.findUnique({
        where: { id },
        include: {
          user: {
            include: {
              profiles: true,
            },
          },
        },
      });

      if (!accounts) {
        return res.status(404).json({
          status: false,
          message: `User with id ${id} not found`,
          data: null,
        });
      }
      res.status(200).json({
        status: true,
        message: "success",
        data: accounts,
      });
    } catch (error) {
      next(error);
    }
  },
};
