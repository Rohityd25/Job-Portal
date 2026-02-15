package com.jobportal.controller;

import com.jobportal.dto.JobApplyResponse;
import com.jobportal.model.Job;
import com.jobportal.model.User;
import com.jobportal.repository.JobApplyRepository;
import com.jobportal.repository.JobRepository;
import com.jobportal.security.SecurityUtil;
import com.jobportal.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruiter")
public class RecruiterController {

    private final JobRepository jobRepository;
    private final JobApplyRepository jobApplyRepository;
    private final UserService userService;

    public RecruiterController(
            JobRepository jobRepository,
            JobApplyRepository jobApplyRepository,
            UserService userService) {
        this.jobRepository = jobRepository;
        this.jobApplyRepository = jobApplyRepository;
        this.userService = userService;
    }

    @PreAuthorize("hasAuthority('ROLE_RECRUITER')")
    @GetMapping("/jobs")
    public List<Job> getRecruiterJobs() {

        String email = SecurityUtil.getCurrentUserEmail();
        User recruiter = userService.findByEmail(email);

        return jobRepository.findAll();
    }

    @PreAuthorize("hasAuthority('ROLE_RECRUITER')")
    @PostMapping("/jobs")
    public Job createJob(@RequestBody Job job) {

        return jobRepository.save(job);
    }

    @PreAuthorize("hasAuthority('ROLE_RECRUITER')")
    @GetMapping("/jobs/{jobId}/applications")
    public List<JobApplyResponse> viewApplications(@PathVariable("jobId") Long jobId) {

        String email = SecurityUtil.getCurrentUserEmail();
        User recruiter = userService.findByEmail(email);

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        return jobApplyRepository.findByJob(job)
                .stream()
                .map(app -> new JobApplyResponse(
                        app.getId(),
                        job.getId(),
                        job.getTitle(),
                        job.getCompany(),
                        app.getAppliedAt()))
                .toList();
    }
}
