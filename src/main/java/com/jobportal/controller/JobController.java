package com.jobportal.controller;

import com.jobportal.dto.JobResponse;
import com.jobportal.model.Job;
import com.jobportal.service.JobService;
import lombok.Getter;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    // Constructor Injection
    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    // Recruiter posts a job
    @PostMapping
    public Job createJob(@RequestBody Job job) {
        return jobService.createJob(job);
    }


    @GetMapping
    public List<JobResponse> getAllJobs() {
        return jobService.getAllJobs()
                .stream()
                .map(job -> {
                    JobResponse res = new JobResponse();
                    res.setId(job.getId());
                    res.setTitle(job.getTitle());
                    res.setCompany(job.getCompany());
                    res.setLocation(job.getLocation());
                    return res;
                })
                .toList();
    }

}
