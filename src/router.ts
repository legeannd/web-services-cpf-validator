import { Router } from "express";

import {
  getAllCPF,
  getCheckedCPF,
  checkCPF,
  updateCPFDescription,
  deleteCPFHistory
} from "./methods";

const router = Router();

router.get("/return/", getAllCPF);

router.get("/return/:cpf", getCheckedCPF);
 
router.post("/check", checkCPF);

router.put("/update/:cpf", updateCPFDescription);

router.delete("/delete/:cpf", deleteCPFHistory);

export default router;