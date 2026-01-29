package com.jobportal.controller;

import com.jobportal.dto.JobApplyResponse;
import com.jobportal.model.User;
import com.jobportal.repository.JobApplyRepository;
import com.jobportal.security.SecurityUtil;
import com.jobportal.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job-seeker")
public class JobSeekerController {

    private final JobApplyRepository jobApplyRepository;
    private final UserService userService;

    public JobSeekerController(
            JobApplyRepository jobApplyRepository,
            UserService userService
    ) {
        this.jobApplyRepository = jobApplyRepository;
        this.userService = userService;
    }


    @PreAuthorize("hasAuthority('ROLE_JOB_SEEKER')")
    @GetMapping("/my-applications")
    public List<JobApplyResponse> myApplications() {

        String email = SecurityUtil.getCurrentUserEmail();
        User user = userService.findByEmail(email);

        return jobApplyRepository.findByUser(user)
                .stream()
                .map(app -> new JobApplyResponse(
                        app.getId(),
                        app.getJob().getId(),
                        app.getJob().getTitle(),
                        app.getJob().getCompany(),
                        app.getAppliedAt()
                ))
                .toList();
    }
}
