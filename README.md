## empPortal

This application was generated using Spring-boot 2.0.5, Angular8 and Mysql.

The following are the guidelines towards the implementation.

* An employee can only sign-up using company email address (something@inmar.com). However,
make the domain i.e. @inmar.com configurable.
* During sign-up, an employee needs to fill mandatory information (e.g. first name, last name,
email, aadhar # etc.). A strong password also needs to be enforced (Have reasonable justification
of what “strong” means)
* After signup, an employee is able to log in using the registered email address and password.
* When an employee logs in, he/she is able to create groups to manage contacts.
* An employee is able to make a group active &/ Inactive.
* Within a group, an employee can create unlimited contacts.
* An employee is able to make the contact active &/ Inactive.
* A contact information can hold all basic information, email and phone number.
* An employee should be able to paginate through multiple contact groups/contacts.
* Employee should be able to select the pagination size
* An employee should be able to search the contact groups or contacts based on
name/email/status.
* Employee should be able to sort the data
* One employee should not be able to see or manage other employee contact groups or contacts.
* At any point, an employee is able to add/modify the information of contact groups and contacts.
* An employee is able to delete contact group or contact
* This application UI should be mobile friendly (responsive). 


## Development

Before you can build this project, you must install and configure the following dependencies on your machine:

1. [Node.js][]: We use Node to run a development web server and build the project.
   Depending on your system, you can install Node either from source or as a pre-packaged bundle.

After installing Node, you should be able to run the following command to install development tools.
You will only need to run this command when dependencies change in [package.json](package.json).

    npm install

We use npm scripts and [Webpack][] as our build system.

Run the following commands in two separate terminals to create a blissful development experience where your browser
auto-refreshes when files change on your hard drive.

    ./mvnw
    npm start

Npm is also used to manage CSS and JavaScript dependencies used in this application. You can upgrade dependencies by
specifying a newer version in [package.json](package.json). You can also run `npm update` and `npm install` to manage dependencies.
Add the `help` flag on any command to see how you can use it. For example, `npm help update`.

The `npm run` command will list all of the scripts available to run for this project.

## Working Directories

Workplace\empPortal\src\main\java - it contains all java code 
Workplace\empPortal\src\main\resources - it contains configurations for DB, Cloud and Application
Workplace\inmar\empPortal\src\main\webapp - it contains all UI code include angular applicaiton. 

## Entites
Group:

{

    "relationships": [
        {
            "relationshipName": "contact",
            "otherEntityName": "contact",
            "relationshipType": "one-to-many",
            "otherEntityRelationshipName": "group"
        }
    ],
    "fields": [
        {
            "fieldName": "name",
            "fieldType": "String",
            "fieldValidateRules": [
                "required",
                "unique"
            ]
        },
        {
            "fieldName": "status",
            "fieldType": "GroupStatus",
            "fieldValues": "ACTIVE,INACTIVE"
        }
    ]
}

Contact:
{
   "relationships": [
        {
            "relationshipName": "group",
            "otherEntityName": "group",
            "relationshipType": "many-to-one",
            "otherEntityField": "id"
        }
    ],
    "fields": [
        {
            "fieldName": "name",
            "fieldType": "String",
            "fieldValidateRules": [
                "required"
            ]
        },
        {
            "fieldName": "emailId",
            "fieldType": "String"
        },
        {
            "fieldName": "status",
            "fieldType": "ContactStatus",
            "fieldValues": "ACTIVE,INACTIVE"
        },
        {
            "fieldName": "mobileNumber",
            "fieldType": "Long",
            "fieldValidateRules": [
                "required"
            ]
        }
    ]
}



### Using angular-cli

Used [Angular CLI][] to generate some custom client code.

For example, the following command:

ng generate component group

    will generate few files:

    create src/main/webapp/app/group/group.html
    create src/main/webapp/app/group/group.ts
    create src/main/webapp/app/group/route.ts
    update src/main/webapp/app/app.module.ts

ng generate component contact

    will generate few files:

    create src/main/webapp/app/contact/contact.html
    create src/main/webapp/app/contact/contact.ts
    create src/main/webapp/app/contact/route.ts
    update src/main/webapp/app/app.module.ts


## Relation between events

    Group is one-to-many relation with contact.
    contact is many-to-many relation with group.

## Production build

 Application deployed jar is buid using follwoing command:

 /mvnw -Pprod package


## Deployed applicaiton in pivotal web services using cloud foundry

 cf push -f deploy\cloudfoundry\manifest.yml -p target\emp-portal-0.0.1-SNAPSHOT.war -m 1700M

Applicaiton URL:

https://empportal.cfapps.io/#/
