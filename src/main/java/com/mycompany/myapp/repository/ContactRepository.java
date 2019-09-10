package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Contact;
import com.mycompany.myapp.domain.Group;
import com.mycompany.myapp.domain.enumeration.ContactStatus;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Contact entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

	Page<Contact> findAllByGroup(Group group, Pageable pageable);

	Optional<List<Contact>> findAllByGroupAndNameLike(Group group, String name);

	Optional<List<Contact>> findAllByGroupAndStatus(Group group, ContactStatus valueOf);

	Optional<List<Contact>> findAllByGroupAndEmail(Group group, String email);

}
