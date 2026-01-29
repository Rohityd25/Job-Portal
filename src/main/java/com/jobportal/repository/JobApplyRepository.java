package com.jobportal.repository;

import com.jobportal.model.Job;
import com.jobportal.model.JobApply;
import com.jobportal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobApplyRepository extends JpaRepository<JobApply, Long> {

    boolean existsByUserAndJob(User user, Job job);

    List<JobApply> findByUser(User user);

    List<JobApply> findByJob(Job job);
}
