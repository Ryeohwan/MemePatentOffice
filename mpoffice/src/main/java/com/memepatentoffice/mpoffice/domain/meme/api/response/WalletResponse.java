package com.memepatentoffice.mpoffice.domain.meme.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class WalletResponse {
    private String fromAddress;
    private String toAddress;
}
