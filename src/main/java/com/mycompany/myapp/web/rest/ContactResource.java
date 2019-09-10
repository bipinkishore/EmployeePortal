package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Contact;
import com.mycompany.myapp.domain.Group;
import com.mycompany.myapp.domain.enumeration.ContactStatus;
import com.mycompany.myapp.domain.enumeration.GroupStatus;
import com.mycompany.myapp.repository.ContactRepository;
import com.mycompany.myapp.repository.GroupRepository;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Contact.
 */
@RestController
@RequestMapping("/api")
public class ContactResource {

    private final Logger log = LoggerFactory.getLogger(ContactResource.class);

    private static final String ENTITY_NAME = "contact";

    private final ContactRepository contactRepository;
    
    private final GroupRepository groupRepository;

    public ContactResource(ContactRepository contactRepository,GroupRepository groupRepository) {
        this.contactRepository = contactRepository;
        this.groupRepository = groupRepository;
    }

    /**
     * POST  /contacts : Create a new contact.
     *
     * @param contact the contact to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contact, or with status 400 (Bad Request) if the contact has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contacts")
    @Timed
    public ResponseEntity<Contact> createContact(@Valid @RequestBody Contact contact) throws URISyntaxException {
        log.debug("REST request to save Contact : {}", contact);
        if (contact.getId() != null) {
            throw new BadRequestAlertException("A new contact cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Contact result = contactRepository.save(contact);
        return ResponseEntity.created(new URI("/api/contacts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contacts : Updates an existing contact.
     *
     * @param contact the contact to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contact,
     * or with status 400 (Bad Request) if the contact is not valid,
     * or with status 500 (Internal Server Error) if the contact couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contacts")
    @Timed
    public ResponseEntity<Contact> updateContact(@Valid @RequestBody Contact contact) throws URISyntaxException {
        log.debug("REST request to update Contact : {}", contact);
        if (contact.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Contact result = contactRepository.save(contact);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contact.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contacts : get all the contacts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of contacts in body
     */
    @GetMapping("/contacts")
    @Timed
    public ResponseEntity<List<Contact>> getAllContacts(Pageable pageable) {
        log.debug("REST request to get a page of Contacts :"+ pageable.toString());
        Page<Contact> page = contactRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/contacts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    
    /**
     * GET  /contacts : get all the contacts.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of contacts in body
     */
    @GetMapping("/group/{id}")
    @Timed
    public ResponseEntity<List<Contact>> getContactsByGroup(Pageable pageable, @PathVariable Long id) {
        log.debug("REST request to get a page of Contacts");
        Optional<Group> group = groupRepository.findById(id);
        Page<Contact> page = contactRepository.findAllByGroup(group.get(),pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/contacts");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /contacts/:id : get the "id" contact.
     *
     * @param id the id of the contact to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contact, or with status 404 (Not Found)
     */
    @GetMapping("/contacts/{id}")
    @Timed
    public ResponseEntity<Contact> getContact(@PathVariable Long id) {
        log.debug("REST request to get Contact : {}", id);
        Optional<Contact> contact = contactRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(contact);
    }

    /**
     * DELETE  /contacts/:id : delete the "id" contact.
     *
     * @param id the id of the contact to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contacts/{id}")
    @Timed
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        log.debug("REST request to delete Contact : {}", id);

        contactRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
    
    @GetMapping("/searchContactByName/{id}/{name}")
    @Timed
    public ResponseEntity<List<Contact>> getAllContactsByName(@PathVariable Long id, @PathVariable String name) {
        log.debug("REST request to get a page of Groups");
        Optional<Group> group = groupRepository.findById(id);
        name="%"+name+"%";
        Optional<List<Contact>> contacts = contactRepository.findAllByGroupAndNameLike(group.get(),name);
        return ResponseUtil.wrapOrNotFound(contacts);
        //return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    @GetMapping("/searchContactByStatus/{id}/{status}")
    @Timed
    public ResponseEntity<List<Contact>> getAllGroupsByStatus(@PathVariable Long id, @PathVariable String status) {
        log.debug("REST request to get a page of Groups");
        Optional<Group> group = groupRepository.findById(id);
        Optional<List<Contact>> contacts = contactRepository.findAllByGroupAndStatus(group.get(),ContactStatus.valueOf(status));
        return ResponseUtil.wrapOrNotFound(contacts);
        //return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
    @GetMapping("/searchContactByEmail/{id}/{email}")
    @Timed
    public ResponseEntity<List<Contact>> getAllGroupsByEmail(@PathVariable Long id, @PathVariable String email) {
        log.debug("REST request to get a page of Groups");
        Optional<Group> group = groupRepository.findById(id);
        Optional<List<Contact>> contacts = contactRepository.findAllByGroupAndEmail(group.get(),email);
        return ResponseUtil.wrapOrNotFound(contacts);
        //return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }
}
