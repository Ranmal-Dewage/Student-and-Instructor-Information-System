# Student and Instructor Information System

## Introduction

Frontend is developed useing React JS and in the backend, we have handled the CPU intensive operations using Spring Boot and we have used Node JS to handle I/O intensive operations. 
By using the admin panel of this system, an admin can Add/Delete Courses, Add/Delete Faculties, Add/Delete Admins, Add/Delete Instructors.

Students can register to the system. After registration a student can log in to the system using email and password. Instructors and Admin can also login to the system using the same login by inputting the email and password provided by the main admin.

Once main admin creates Instructors and Admin the created admin and instructors will receive a confirmation email and for students also once they are registered, they will receive a verification email to activate their account.

Instructors can add course and create assignment materials to the system and then student can view the courses and upload files to the created assignments.

All the Admin/Instructors/Students cans search courses by providing course name or course id.

## System Architecture

<img src="https://imgbbb.com/images/2019/06/26/Untitled.png" alt="Untitled.png" border="0" />
<br>

## Technologies
* reactjs
* javascript
* nodejs
* expressjs
* mongodb
* mongoose
* java
* spring-boot

## User Guide

#### 1. Following Figure show the the landing page of the student and instructor management system.
<br><img src="https://imgbbb.com/images/2019/06/26/1.png" alt="1.png" border="0">
Figure_1: landing page
<p></p><br />

#### 2. Students can register to the system by clicking the Sign-up button. Student must provide faculty and degree they want to register.
<br><img src="https://imgbbb.com/images/2019/06/26/2.png" alt="2.png" border="0">
Figure_2: register
<p></p><br />

#### 3. Once student registers to the system it will send a confirmation email to the given email. Student needs to click the confirmation link in the email in order to activate the account.
<br><img src="https://imgbbb.com/images/2019/06/26/3.png" alt="3.png" border="0">
Figure_3: confirm email
<p></p><br />

#### 4. After confirming the registration user can login to the system.
<br><img src="https://imgbbb.com/images/2019/06/26/4.png" alt="4.png" border="0">
Figure_4: login
<p></p><br />

#### 5. Following figure shows the Home page of login user with my courses, faculties and profile options.
<br><img src="https://imgbbb.com/images/2019/06/26/5.png" alt="5.png" border="0">
Figure_5: student home
<p></p><br />


#### 6. Students can view their profile details by clicking profile button in side navigation
<br><img src="https://imgbbb.com/images/2019/06/26/6.png" alt="6.png" border="0">
Figure_6: user profile
<p></p><br />

#### 7. Students can view available faculties in side navigation. Once student click the faculty, they can view the degrees available in that selected faculty.
<br><img src="https://imgbbb.com/images/2019/06/26/7.png" alt="7.png" border="0">
Figure_7: view degrees
<p></p><br />

#### 8. Once student click the degree, they can view the courses available in that degree.  They can filter courses by year and the semester. Also, they can enroll to the courses.
<br><img src="https://imgbbb.com/images/2019/06/26/8.png" alt="8.png" border="0">
Figure_8: view courses
<p></p><br />

#### 9. Students can search courses by typing the course name in top navigation panel.
<br><img src="https://imgbbb.com/images/2019/06/26/9.png" alt="9.png" border="0">
Figure_9: search course
<p></p><br />

#### 10. Students can view the enrolled courses by clicking my course link in the side navigation.
<br><img src="https://imgbbb.com/images/2019/06/26/10.png" alt="10.png" border="0">
Figure_10: upload answers to assignments
<p></p><br />
<br><img src="https://imgbbb.com/images/2019/06/26/11.png" alt="11.png" border="0">
Figure_11: view and download course materials
<p></p><br />

#### 11. Once the Instructor login to the system they can edit the courses (add assignment/exam, update due dates, add course materials) by selecting the course in my course dropdown in the side navigation.
<br><img src="https://imgbbb.com/images/2019/06/26/12.png" alt="12.png" border="0">
Figure_12: add exam or assignment
<p></p><br />
<br><img src="https://imgbbb.com/images/2019/06/26/13.png" alt="13.png" border="0">
Figure_13: edit assignment and add course materials
<p></p><br />

#### 12. Once admin login to the system they can manage faculties, courses, users (admin, instructor), degrees.
<br><img src="https://imgbbb.com/images/2019/06/26/14.png" alt="14.png" border="0">
Figure_14: admin home
<p></p><br />

#### 13. Admins can manage faculties.
<br><img src="https://imgbbb.com/images/2019/06/26/15.png" alt="15.png" border="0">
Figure_15: faculty management
<p></p><br />

#### 14. Admins can manage courses.
<br><img src="https://imgbbb.com/images/2019/06/26/16.png" alt="16.png" border="0">
Figure_16: course management
<p></p><br />

#### 15. Admins can add or delete users.
<br><img src="https://imgbbb.com/images/2019/06/26/17.png" alt="17.png" border="0">
Figure_17: add user
<p></p><br />
<br><img src="https://imgbbb.com/images/2019/06/26/18.png" alt="18.png" border="0">
Figure_18: delete users
<p></p><br />

#### 16. A short description about the SLIIT and objectives are containing in about us page.
<br><img src="https://imgbbb.com/images/2019/06/26/19.png" alt="19.png" border="0">
Figure_19: about us page
<p></p><br />

#### 17. By using the “contact us” page users can contact the support team and the location, contact details are available in the contact us page.
<br><img src="https://imgbbb.com/images/2019/06/26/20.png" alt="20.png" border="0">
Figure_20: contact us page
<p></p><br />

#### 18. In the home page it contains latest notices and event plan of the university.
<br><img src="https://imgbbb.com/images/2019/06/26/21.png" alt="21.png" border="0">
Figure_21: event calendar
<p></p><br />

## Known issues

•	When student uploading answers to the assignments, they need to follow the given file naming convention as we currently don’t maintain a folder structure in the file server. The name of the upload file should be <course>_<assignment>_<idNo> ( ex: af_assignment1_it16170162.pdf)

#### Developed by Team VIKING RAIDERS;
* Ranmal Dewage
* Tenusha Guruge
* Vimukthi Rajapaksha
* Aravinda Kulasooriya


## Copyright

(C) 2019 Ranmal Dewage (ranmal.b.dewage@gmail.com)
<br>
[ranmaldewage.wordpress.com](https://ranmaldewage.wordpress.com)
