import express from 'express'

// controller
import AdminController from '../controllers/AdminController'
import ChauffeurController from '../controllers/ChauffeurController'
import VehiculeController from '../controllers/VehiculeController'
import CarburantController from '../controllers/CarburantController'
import MaintenanceController from '../controllers/MaintenanceController'
import ConduireController from '../controllers/ConduireController'
import LocalisationController from '../controllers/LocalisationController'

// validation
import AdminValidation from '../middlewares/validation/AdminValidation'
import ChauffeurValidation from '../middlewares/validation/ChauffeurValidation'
import VehiculeValidation from '../middlewares/validation/VehiculeValidation'
import CarburantValidation from '../middlewares/validation/CarburantValidation'
import MaintenanceValidation from '../middlewares/validation/MaintenanceValidation'

// authorization
import Authorization from '../middlewares/Authorization'


const router = express.Router()

// admin
router.post('/admin/register', AdminValidation.RegisterValidation,  AdminController.Register)
router.post('/admin/login', AdminValidation.LoginValidation,  AdminController.Login)
router.post('/admin/logout', Authorization.Authenticated,  AdminController.Logout)

// chauffeur
router.get('/chauffeur/get/all', Authorization.Authenticated, ChauffeurController.GetAll)
router.post('/chauffeur/register', ChauffeurValidation.RegisterValidation,  ChauffeurController.Register)
router.post('/chauffeur/login', ChauffeurValidation.LoginValidation, ChauffeurController.Login)
router.delete('/chauffeur/destroy/:id/admin/:adminId', Authorization.Authenticated, ChauffeurController.destroy)

// véhicule
router.get('/vehicule/get/all', Authorization.Authenticated, VehiculeController.GetAll)
router.post('/vehicule/create', VehiculeValidation.CreatedValidation, Authorization.Authenticated,   VehiculeController.create)
router.delete('/vehicule/destroy/:id', Authorization.Authenticated, VehiculeController.destroy)

// carburant
router.post('/carburant/create/chauffeur/:chauffeurId', CarburantValidation.CreatedValidation, Authorization.Authenticated,  CarburantController.create)
router.delete('/carburant/destroy/:id/admin/:adminId', Authorization.Authenticated,  CarburantController.destroy)

// maintenance
router.post('/maintenance/create/chauffeur/:chauffeurId', MaintenanceValidation.CreatedValidation, Authorization.Authenticated,  MaintenanceController.create)
router.delete('/maintenance/destroy/:id/admin/:adminId', Authorization.Authenticated,  MaintenanceController.destroy)

// conduire
router.post('/conduire/create/chauffeur/:chauffeurId', Authorization.Authenticated,  ConduireController.create)

// localisation
router.post('/localisation/create/chauffeur/:chauffeurId', Authorization.Authenticated, LocalisationController.create)
router.patch('/localisation/update/chauffeur/:localisationId', Authorization.Authenticated, LocalisationController.update)


router.get('/carburant/get/all', Authorization.Authenticated, CarburantController.GetAll)
router.get('/maintenance/get/all', Authorization.Authenticated, MaintenanceController.GetAll)


export default router