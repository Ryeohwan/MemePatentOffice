package com.memepatentoffice.auction.common.util;

public interface ExceptionSupplier <T>{
    T get() throws Exception;
}
