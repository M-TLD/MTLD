package com.mtld.backend.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * created by seongmin on 2022/09/20
 */
public class ConvertDate {
    public static LocalDate stringToDate(String date) {
        return LocalDate.parse(date, DateTimeFormatter.ISO_DATE);
    }
}
