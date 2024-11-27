import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from './UI/home/home.component';
import { LoginComponent } from './UI/login/login.component';
import { DashboardComponent } from './UI/Admin/dashboard/dashboard.component';
import { UserMasterComponent } from './UI/Admin/user-master/user-master.component';
import { UserAddMasterComponent } from './UI/Admin/user-add-master/user-add-master.component';
import { CategoryMasterComponent } from './UI/Admin/category-master/category-master.component';
import { CategoryAddMasterComponent } from './UI/Admin/category-add-master/category-add-master.component';
import { ProductAddMasterComponent } from './UI/Admin/product-add-master/product-add-master.component';
import { ProductMasterComponent } from './UI/Admin/product-master/product-master.component';
import { ProductListComponent } from './UI/product-list/product-list.component';
import { CartCheckoutComponent } from './UI/cart-checkout/cart-checkout.component';
import { RegisterComponent } from './UI/register/register.component';
import { PasswordChangeComponent } from './UI/password-change/password-change.component';
import { EmployeeComponent } from './UI/employee/employee.component';
import { SupplierMasterComponent } from './UI/Admin/supplier-master/supplier-master.component';
import { SupplierAddMasterComponent } from './UI/Admin/supplier-add-master/supplier-add-master.component';
import { TestComponent } from './UI/test/test.component';
import { OrderViewComponent } from './UI/Admin/order-view/order-view.component';

import { RptEmplyeeComponent } from './UI/Admin/Reports/rpt-emplyee/rpt-emplyee.component';
import { RptDailyIncomeComponent } from './UI/Admin/Reports/rpt-daily-income/rpt-daily-income.component';
import { RptCustomerComponent } from './UI/Admin/Reports/rpt-customer/rpt-customer.component';
import { RptProductComponent } from './UI/Admin/Reports/rpt-product/rpt-product.component';
import { AboutusComponent } from './UI/aboutus/aboutus.component';
import { ContactUsComponent } from './UI/contact-us/contact-us.component';
import { AuthGuardService } from './Services/auth/auth-guard.service';


const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent}, 
  {path:'login',component:LoginComponent}, 
  {path:'dashboard',component:DashboardComponent,canActivate: [AuthGuardService] }, 
  {path:'user',component:UserMasterComponent}, 
  {path:'AddUser/:fun/:id',component:UserAddMasterComponent}, 
  {path:'about-us',component:AboutusComponent}, 
  {path:'contact-us',component:ContactUsComponent}, 
  {path:'category',component:CategoryMasterComponent}, 
  {path:'AddCategory/:fun/:id',component:CategoryAddMasterComponent}, 

  {path:'product',component:ProductMasterComponent}, 
  {path:'AddProduct/:fun/:id',component:ProductAddMasterComponent}, 
  // {path:'productList/:id',component:ProductListComponent}, 
  {path:'productList',component:ProductListComponent}, 
  // {path:'productList',component:ProductListComponent}, 
  {path:'cart',component:CartCheckoutComponent}, 
  {path:'register/:fun/:id',component:RegisterComponent}, 
  {path:'ChangePassword',component:PasswordChangeComponent},  
  {path:'employee',component:EmployeeComponent},  
  {path:'supplier',component:SupplierMasterComponent,canActivate: [AuthGuardService] },  
  {path:'addsupplier/:fun/:id',component:SupplierAddMasterComponent}, 
  {path:'OrderStatus',component:OrderViewComponent,canActivate: [AuthGuardService] }, 
  
  {path:'EmployeeReport',component:RptEmplyeeComponent ,canActivate: [AuthGuardService] }, 
  {path:'IncomeReport',component:RptDailyIncomeComponent,canActivate: [AuthGuardService] }, 
  {path:'CustomerReport',component:RptCustomerComponent,canActivate: [AuthGuardService] }, 
  {path:'ProductReport',component:RptProductComponent,canActivate: [AuthGuardService] }, 



  {path:'Test/:id',component:TestComponent}, 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
