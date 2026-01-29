package com.jobportal.service.impl;

import com.jobportal.model.Job;
import com.jobportal.model.JobApply;
import com.jobportal.model.User;
import com.jobportal.repository.JobApplyRepository;
import com.jobportal.repository.JobRepository;
import com.jobportal.security.SecurityUtil;
import com.jobportal.service.JobApplyService;
import com.jobportal.service.UserService;
import org.springframework.stereotype.Service;
import com.jobportal.exception.DuplicateJobApplyException;


import java.time.LocalDateTime;

@Service
public class JobApplyServiceImpl implements JobApplyService {

    private final JobApplyRepository jobApplyRepository;
    private final JobRepository jobRepository;
    private final UserService userService;

    public JobApplyServiceImpl(
            JobApplyRepository jobApplyRepository,
            JobRepository jobRepository,
            UserService userService
    ) {
        this.jobApplyRepository = jobApplyRepository;
        this.jobRepository = jobRepository;
        this.userService = userService;
    }

    @Override
    public JobApply applyJob(Long jobId) {

        // 1️⃣ logged-in user (JWT)
        String email = SecurityUtil.getCurrentUserEmail();
        User user = userService.findByEmail(email);

        // 2️⃣ job fetch
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));



        // 4️⃣ save application
        JobApply apply = new JobApply();
        apply.setUser(user);
        apply.setJob(job);
        apply.setAppliedAt(LocalDateTime.now());
        if (jobApplyRepository.existsByUserAndJob(user, job)) {
            throw new DuplicateJobApplyException(
                    "You have already applied for this job"
            );
        }


        return jobApplyRepository.save(apply);
    }
}
