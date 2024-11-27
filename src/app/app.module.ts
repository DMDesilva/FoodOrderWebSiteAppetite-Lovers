import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { DatePipe } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';

import {MatExpansionModule} from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './UI/navbar/navbar.component';
import { FooterComponent } from './UI/footer/footer.component';
import { HomeComponent } from './UI/home/home.component';
import { LoginComponent } from './UI/login/login.component';
import { AdminNavbarComponent } from './UI/Admin/admin-navbar/admin-navbar.component';
import { SidebarComponent } from './UI/Admin/sidebar/sidebar.component';
import { DashboardComponent } from './UI/Admin/dashboard/dashboard.component';
import { UserMasterComponent } from './UI/Admin/user-master/user-master.component';
import { UserAddMasterComponent } from './UI/Admin/user-add-master/user-add-master.component';
import { DeleteConfirmComponent } from './DialogModal/delete-confirm/delete-confirm.component';
import { CategoryMasterComponent } from './UI/Admin/category-master/category-master.component';
import { CategoryAddMasterComponent } from './UI/Admin/category-add-master/category-add-master.component';
import { ProductAddMasterComponent } from './UI/Admin/product-add-master/product-add-master.component';
import { ProductMasterComponent } from './UI/Admin/product-master/product-master.component';
import { ProductListComponent } from './UI/product-list/product-list.component';
import { AddtoCartComponent } from './DialogModal/addto-cart/addto-cart.component';
import { LoginInfoComponent } from './DialogModal/login-info/login-info.component';
import { CartCheckoutComponent } from './UI/cart-checkout/cart-checkout.component';

import { RegisterComponent } from './UI/register/register.component';
import { PasswordChangeComponent } from './UI/password-change/password-change.component';
import { EmployeeComponent } from './UI/employee/employee.component';
import { SupplierMasterComponent } from './UI/Admin/supplier-master/supplier-master.component';
import { SupplierAddMasterComponent } from './UI/Admin/supplier-add-master/supplier-add-master.component';
import { MessageViewComponent } from './DialogModal/message-view/message-view.component';
import { TestComponent } from './UI/test/test.component';
import { RptEmplyeeComponent } from './UI/Admin/Reports/rpt-emplyee/rpt-emplyee.component';
import { RptDailyIncomeComponent } from './UI/Admin/Reports/rpt-daily-income/rpt-daily-income.component';
import { RptCustomerComponent } from './UI/Admin/Reports/rpt-customer/rpt-customer.component';
import { RptProductComponent } from './UI/Admin/Reports/rpt-product/rpt-product.component';
import { OrderViewComponent } from './UI/Admin/order-view/order-view.component';
import { OrderDetailsComponent } from './DialogModal/order-details/order-details.component';
import { OrderConfirmComponent } from './DialogModal/order-confirm/order-confirm.component';
import { AboutusComponent } from './UI/aboutus/aboutus.component';
import { ContactUsComponent } from './UI/contact-us/contact-us.component';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    AdminNavbarComponent,
    SidebarComponent,
    DashboardComponent,
    UserMasterComponent,
    UserAddMasterComponent,
    DeleteConfirmComponent,
    CategoryMasterComponent,
    CategoryAddMasterComponent,
    ProductAddMasterComponent,
    ProductMasterComponent,
    ProductListComponent,
    AddtoCartComponent,
    LoginInfoComponent,
    CartCheckoutComponent,
    RegisterComponent,
    PasswordChangeComponent,
    EmployeeComponent,
    SupplierMasterComponent,
    SupplierAddMasterComponent,
    MessageViewComponent,
    TestComponent,
    RptEmplyeeComponent,
    RptDailyIncomeComponent,
    RptCustomerComponent,
    RptProductComponent,
    OrderViewComponent,
    OrderDetailsComponent,
    OrderConfirmComponent,
    AboutusComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,MatDialogModule,MatInputModule,MatButtonModule,MatRadioModule,MatDatepickerModule,MatNativeDateModule,
    ToastrModule.forRoot(),MatExpansionModule,MatIconModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
