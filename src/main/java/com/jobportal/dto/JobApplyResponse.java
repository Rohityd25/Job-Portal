package com.jobportal.dto;

import java.time.LocalDateTime;

public class JobApplyResponse {

    private Long applicationId;
    private Long jobId;
    private String jobTitle;
    private String company;
    private LocalDateTime appliedAt;

    public JobApplyResponse(
            Long applicationId,
            Long jobId,
            String jobTitle,
            String company,
            LocalDateTime appliedAt
    ) {
        this.applicationId = applicationId;
        this.jobId = jobId;
        this.jobTitle = jobTitle;
        this.company = company;
        this.appliedAt = appliedAt;
    }


    public Long getApplicationId() {
        return applicationId; }
    public Long getJobId() {
        return jobId; }
    public String getJobTitle() {
        return jobTitle; }
    public String getCompany() {
        return company; }
    public LocalDateTime getAppliedAt() {
        return appliedAt; }
}
