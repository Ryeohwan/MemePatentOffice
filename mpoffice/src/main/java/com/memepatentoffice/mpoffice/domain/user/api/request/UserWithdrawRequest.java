package com.memepatentoffice.mpoffice.domain.user.api.request;


import lombok.Builder;
import lombok.Getter;

@Getter
public class UserWithdrawRequest {
    private final Long id;

    private final String withdrawalReason;

    @Builder
    public UserWithdrawRequest(Long id, String withdrawalReason) {
        this.id = id;
        this.withdrawalReason = withdrawalReason;
    }


}
