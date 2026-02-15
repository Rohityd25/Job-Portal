package com.jobportal.controller;

import com.jobportal.dto.JobApplyResponse;
import com.jobportal.model.JobApply;
import com.jobportal.service.JobApplyService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/jobs")
public class JobApplyController {

    private final JobApplyService jobApplyService;

    public JobApplyController(JobApplyService jobApplyService) {
        this.jobApplyService = jobApplyService;
    }

    @PostMapping("/{jobId}/apply")
    @PreAuthorize("hasAuthority('ROLE_JOB_SEEKER')")
    public JobApplyResponse applyJob(@PathVariable("jobId") Long jobId) {

        JobApply apply = jobApplyService.applyJob(jobId);

        return new JobApplyResponse(
                apply.getId(),
                apply.getJob().getId(),
                apply.getJob().getTitle(),
                apply.getJob().getCompany(),
                apply.getAppliedAt());
    }

}
