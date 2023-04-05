package com.memepatentoffice.mpoffice.domain.user.db.repository;

import com.memepatentoffice.mpoffice.db.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    Optional<Alarm> findById(Long alarmId);
    Optional<Alarm> findByUserId(Long userId);

    long countByCheckedAndUserId(int checked, Long userId);

    @Override
    <S extends Alarm> S save(S entity);
}
