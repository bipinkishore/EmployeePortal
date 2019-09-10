package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Group;
import com.mycompany.myapp.domain.enumeration.GroupStatus;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Group entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

	Page<Group> findAllByLogin(String string, Pageable pageable);

	Optional<List<Group>> findAllByLoginAndNameLike(String string, String name);

	Optional<List<Group>> findAllByLoginAndStatus(String string, GroupStatus groupStatus);

}
